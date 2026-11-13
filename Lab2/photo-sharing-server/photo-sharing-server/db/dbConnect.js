const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  if (!process.env.DB_URL) {
    throw new Error("Thiếu DB_URL trong file .env");
  }
  await mongoose.connect(process.env.DB_URL);
  console.log("Đã kết nối MongoDB.");
}

module.exports = dbConnect;
