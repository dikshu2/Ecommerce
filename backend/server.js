const app = require("./app");
const connectDB = require("./config/databaseConfig");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server Started in port ${process.env.PORT}`);
});
