const express = require("express");
const mongoose = require("mongoose");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  try {
    const users = await User.find().select("_id first_name last_name").lean();
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: "Không thể tải danh sách người dùng." });
  }
});

router.get("/:id", async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ message: "ID người dùng không hợp lệ." });
  }

  try {
    const user = await User.findById(request.params.id)
      .select("_id first_name last_name location description occupation")
      .lean();
    if (!user) {
      return response.status(400).json({ message: "Không tìm thấy người dùng." });
    }
    return response.json(user);
  } catch (error) {
    return response.status(500).json({ message: "Không thể tải người dùng." });
  }
});

module.exports = router;
