import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
dotenv.config()

const app= express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("This is home route");
});
app.get("/test", (req, res) => {
res.json({ message: "This is test route" });
});


const port = Number(process.env.PORT) || 3002;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

