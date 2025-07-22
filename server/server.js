const express = require('express');
const connectDB = require('./config/db.js')
const taskRouter = require('./router/taskRouter.js')
const app = express();
const PORT = 3001

app.use(express.json());


app.use('/api/task',taskRouter)


const connectServer = async () => {
   try {
     await connectDB()
      app.listen(PORT, () => {
      console.log(`✅ Server is running on ${PORT}`);
    });
   } catch (error) {
    console.log("Error connecting server", error)
   }
}
connectServer()


