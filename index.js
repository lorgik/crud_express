import express from "express";
import router from "./router.js";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/", router);

async function startApp() {
  try {
    app.listen(PORT, () => console.log("Server is running on port", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
