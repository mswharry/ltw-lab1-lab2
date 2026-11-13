import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setUser(null);
    setError("");
    fetchModel(`/user/${userId}`)
      .then((data) => { if (active) setUser(data); })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [userId]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography>Đang tải người dùng...</Typography>;

  return (
    <>
      <Typography variant="h4">{user.first_name} {user.last_name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {user.occupation} · {user.location}
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>{user.description}</Typography>
      <Button variant="contained" component={Link} to={`/photos/${user._id}`}>
        Xem ảnh của {user.first_name}
      </Button>
    </>
  );
}

export default UserDetail;
