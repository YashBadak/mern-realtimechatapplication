require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB = require("./config/db");
const userRouter=require("./routers/userRouter")
const chatRouter=require("./routers/chatRouter")
const messageRouter=require("./routers/messageRouter")
const {notFound,errorHandler}=require("./middlewares/errorMiddlewares")
const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 3000

connectDB();


app.use("/api/user",userRouter);
app.use("/api/chat",chatRouter);
app.use("/api/message",messageRouter);




app.use(notFound);
app.use(errorHandler);
const server=app.listen(PORT,()=>{console.log(`Port Running on ${PORT}`)});

const io=require("socket.io")(server,{
    cors:{
        pingTimeout:60000,
        origin: process.env.CLIENT_BASE_URL,
    }
})

io.on("connection",(socket)=>{
    console.log("connected To socket.io");

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit("connected");
    });

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("User Joined Room" + room);

    });

    socket.on('typing',(room)=> socket.in(room).emit("typing"));
    socket.on('stop typing',(room)=> socket.in(room).emit("stop typing"));

    socket.on("new message",(newMessageRecieved)=>{
        let chat=newMessageRecieved.chat;
        if(!chat.users) return console.log("chat.users Not Defined");

        chat.users.forEach(user=> {
            if(user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message reveived",newMessageRecieved);
        })

    })

    socket.off('setup',()=>{
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
})