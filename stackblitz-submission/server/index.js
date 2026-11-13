const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.DB_URL) {
  const dbConnect = require("./db/dbConnect");
  const SchemaInfo = require("./db/schemaInfo");
  app.use("/user", require("./routes/UserRouter"));
  app.use("/photosOfUser", require("./routes/PhotoRouter"));
  app.get("/test/info", async (request, response) => {
    try {
      response.json(await SchemaInfo.findOne().lean());
    } catch (error) {
      response.status(500).json({ message: "Không thể tải thông tin dữ liệu." });
    }
  });
  dbConnect()
    .then(() => app.listen(8081, () => console.log("API MongoDB: cổng 8081")))
    .catch((error) => {
      console.error("Không thể kết nối MongoDB:", error);
      process.exitCode = 1;
    });
} else {
  // StackBlitz WebContainers cannot make direct TCP connections to MongoDB.
  app.use(require("./demoRoutes"));
  app.listen(8081, () => console.log("API dữ liệu mẫu: cổng 8081"));
}
