import express, { Application } from "express";
import dutyRoutes from "./routes/duty.routes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app: Application = express();

app.use(helmet());
app.use(
    cors({
        origin: "*",
    })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "OK" });
});
app.use("/duty", dutyRoutes);




export default app;
