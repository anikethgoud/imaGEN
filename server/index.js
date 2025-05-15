// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import generateImageRoute from "./routes/GenerateImage.js";
// import posts from "./routes/Posts.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true })); // for form data

// app.use("/api/generateImage/", generateImageRoute);
// app.use("/api/post/", posts);

// // error handler
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });

// app.get("/", async (req, res) => {
//   res.status(200).json({
//     message: "Hello",
//   });
// });

// const connectDB = () => {
//   mongoose.set("strictQuery", true);
//   mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => console.log("Connected to Mongo DB"))
//     .catch((err) => {
//       console.error("failed to connect with mongo");
//       console.error(err);
//     });
// };

// const startServer = async () => {
//   try {
//     connectDB();
//     app.listen(8080, () => console.log("Server started on port 8080"));
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import post from  "./routes/Posts.js";
import generateImageRoute  from "./routes/GenerateImage.js";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({extended : true}));


app.use("/api/post", post);
app.use("/api/generateImage", generateImageRoute);


//error handler
app.use((err,req,res,next) => {
    const status=err.status || 500;
    const message=err.message || "Sommething went wrong!🥲";
    return res.status(status).json({
        success : false,
        status,
        message,
    });
});


//Default get
app.get("/",async(req,res)=>{
    res.status(200).json({
        message : "Hello Bunny!",
    });
});


//function to connect mongoDB
const connectDB = () => {
    mongoose.set("strictQuery",true);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("MONGODB CONNECTED"))
        .catch((err) => {
            console.log("Failed to connect to DataBase");
            console.log(err);
    });  
};

//function to start the server
const startServer = async () => {
    try{
        connectDB();
        app.listen(8080,()=>console.log("Server started on port 8080"));
    }catch(error){
        console.log(error);
    }
};

startServer();
