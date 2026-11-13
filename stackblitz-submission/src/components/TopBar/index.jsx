import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function TopBar() {
  const userMatch = useMatch("/users/:userId");
  const photoMatch = useMatch("/photos/:userId");
  const userId = (userMatch || photoMatch)?.params.userId;
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;
    setUser(null);
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((data) => { if (active) setUser(data); })
        .catch(() => { if (active) setUser(null); });
    }
    return () => { active = false; };
  }, [userId]);

  const name = user ? `${user.first_name} ${user.last_name}` : "";
  const context = photoMatch && name ? `Photos of ${name}` : name || "Danh sách người dùng";

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">Vũ Đặng Hải Đăng</Typography>
        <Typography variant="h6" color="inherit">{context}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
