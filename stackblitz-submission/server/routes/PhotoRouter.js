const express = require("express");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(400).json({ message: "ID người dùng không hợp lệ." });
  }

  try {
    const owner = await User.exists({ _id: id });
    if (!owner) {
      return response.status(400).json({ message: "Không tìm thấy người dùng." });
    }

    const photos = await Photo.find({ user_id: id })
      .select("_id user_id file_name date_time comments")
      .lean();
    const commenterIds = [...new Set(photos.flatMap((photo) =>
      (photo.comments || []).map((comment) => String(comment.user_id))
    ))];
    const commenters = await User.find({ _id: { $in: commenterIds } })
      .select("_id first_name last_name")
      .lean();
    const usersById = new Map(commenters.map((user) => [String(user._id), user]));

    return response.json(photos.map((photo) => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: (photo.comments || []).map((comment) => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: usersById.get(String(comment.user_id)) || null,
      })),
    })));
  } catch (error) {
    return response.status(500).json({ message: "Không thể tải ảnh." });
  }
});

module.exports = router;
