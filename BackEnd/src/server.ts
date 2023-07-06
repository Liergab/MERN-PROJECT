import app from "./app"
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT 
const db = async() => {
    try {
       const connect = await mongoose.connect(env.MONGO_CONNECTION_STRING)
       console.log("Database connection:", connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log("error");
        process.exit(1)
    }  
};
db();
app.listen(port, () => {
    console.log(`Server running: ${port}`)
})


