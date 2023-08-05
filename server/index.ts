import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";
import deserializeUser from "./middleware/deserializeUser";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080 || process.env.PORT;
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

//simple route
app.use("", router);
app.use(deserializeUser);

app.get("", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the application" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
