const express = require('express');
const connectDB = require('./config/db.js')
const app = express();
const PORT = 3001


const connectServer = async () => {
   try {
     await connectDB()
     console.log(`Server is running on port ${PORT}`)
   } catch (error) {
    console.log("Error connecting server", error)
   }
}
connectServer()


