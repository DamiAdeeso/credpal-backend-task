import express,{Request,Response} from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routes/UserRoutes";

dotenv.config();

mongoose.connect(<string>process.env.MONGODB_URI).then(()=>{
    console.log("Database Connected Successfully");
}    
).catch((error)=>{
    console.log(error);
})

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/user",userRouter);



app.listen(port,() =>{
    console.log(`[server]: Server is running at http://localhost:${port}`)
})