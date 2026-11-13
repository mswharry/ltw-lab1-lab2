const express = require("express");
const models = require("./modelData/models");

const router = express.Router();
const shortUser = (user) => ({
  _id: user._id,
  first_name: user.first_name,
  last_name: user.last_name,
});

router.get("/test/info", (request, response) => {
  response.json(models.schemaInfo());
});

router.get("/user/list", (request, response) => {
  response.json(models.userListModel().map(shortUser));
});

router.get("/user/:id", (request, response) => {
  const user = models.userModel(request.params.id);
  if (!user) return response.status(400).json({ message: "Không tìm thấy người dùng." });
  return response.json({
    ...shortUser(user),
    location: user.location,
    description: user.description,
    occupation: user.occupation,
  });
});

router.get("/photosOfUser/:id", (request, response) => {
  if (!models.userModel(request.params.id)) {
    return response.status(400).json({ message: "Không tìm thấy người dùng." });
  }
  return response.json(models.photoOfUserModel(request.params.id).map((photo) => ({
    _id: photo._id,
    user_id: photo.user_id,
    file_name: photo.file_name,
    date_time: photo.date_time,
    comments: (photo.comments || []).map((comment) => ({
      _id: comment._id,
      comment: comment.comment,
      date_time: comment.date_time,
      user: shortUser(comment.user),
    })),
  })));
});

module.exports = router;
