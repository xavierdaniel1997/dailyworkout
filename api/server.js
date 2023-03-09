require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");


const app = express();

// middlewares
app.use(express.json())

//routes

app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)


app.get('/', (req, res) => {
    res.send("Backend Server Starts")
})
// connection to db 

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(4000, () => {   
        console.log("Connected to db & server starts at port 4000");
    })
})
.catch((error) => { 
    console.log(error,"mongodb connection failed !");
})
 
 