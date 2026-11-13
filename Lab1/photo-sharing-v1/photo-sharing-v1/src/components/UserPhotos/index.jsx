import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

const formatDate = (date) => new Date(date).toLocaleString("vi-VN");

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setPhotos(null);
    setError("");
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => { if (active) setPhotos(data); })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, [userId]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!photos) return <Typography>Đang tải ảnh...</Typography>;
  if (photos.length === 0) return <Typography>Người dùng chưa có ảnh.</Typography>;

  return (
    <div className="user-photos">
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia component="img" image={`/images/${photo.file_name}`} alt={photo.file_name} />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Đăng lúc {formatDate(photo.date_time)}
            </Typography>
            <Divider className="photo-divider" />
            {(photo.comments || []).map((comment) => (
              <div key={comment._id} className="photo-comment">
                <Typography variant="subtitle2">
                  {comment.user ? (
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  ) : "Người dùng không còn tồn tại"}{" "}
                  <Typography component="span" variant="caption" color="text.secondary">
                    · {formatDate(comment.date_time)}
                  </Typography>
                </Typography>
                <Typography variant="body2">{comment.comment}</Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
