// console.log(`Shri Swami Samarth`);
// console.log(`Radhe Radhe`);

import express from "express";
import bodyparser from "express";
import db from "./Models/db.js";
import Userrouter from "./Router/Router.js"
import Reciperouter from "./Router/Recipe.js";
import cors from "cors";
import path from "path";


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyparser.json());
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
}))

app.use("/api",Userrouter);
app.use('/api',Reciperouter);


app.listen(port, ()=>{
    try{
        db.connect();
        console.log("Successfully Connected To Postgres  ✅")
        console.log(`Localhost is running on ${port} server 🚀 `);
    }catch(error){
        console.log("Database Connection Error ❌", error)
    }
})

//mongoose username = suyogdaule2807
// mongoose password = Test1234