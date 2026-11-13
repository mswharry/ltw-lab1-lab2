const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const SchemaInfo = require("./db/schemaInfo");

app.use(cors());
app.use(express.json());
app.use("/user", UserRouter);
app.use("/photosOfUser", PhotoRouter);

app.get("/test/info", async (request, response) => {
  try {
    const info = await SchemaInfo.findOne().lean();
    response.json(info);
  } catch (error) {
    response.status(500).json({ message: "Không thể tải thông tin dữ liệu." });
  }
});

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

dbConnect().then(() => {
  app.listen(8081, () => console.log("Server đang chạy ở cổng 8081"));
}).catch((error) => {
  console.error("Không thể kết nối MongoDB:", error);
  process.exitCode = 1;
});
