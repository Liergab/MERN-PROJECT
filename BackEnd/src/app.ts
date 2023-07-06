import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";
import router from "./routes/index"
import morgan from 'morgan';
import createHttpError,{isHttpError} from "http-errors";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/user',router)

app.use((req,res,next) => {
    next(createHttpError(404,"End point not found"))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next:NextFunction ) => {
    console.error(error);
    let errorMessage = "An unknown occurred";
    let statusCode = 500;
  if(isHttpError(error)){
    statusCode = error.status;
    errorMessage = error.message
  }
    res.status(statusCode).json({error: errorMessage})

})

export default app;