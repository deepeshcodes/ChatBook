const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"));  
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main()
.then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

//Index Route
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    // console.log(chats);
    // res.send("Working");

    res.render("index.ejs",{chats});
})

//NEW ROUTE
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})


//CREATE ROUTE
app.post("/chats",(req,res)=>{
     let{from,message,to} = req.body;

    //  console.log("Original message: ",JSON.stringify(message));

    message = message.trim();

     let newChat = new Chat({
        from: from,
        message: message,
        to: to,
        date: new Date(),
     });
    //  console.log(newChat);
    //  res.send("New Chat Entered");

    newChat.save()
    .then(() => {
        console.log("chat entered");
    }) .catch((res)=>{
        console.log(res);
    });

    res.redirect("/chats");
});

// EDIT ROUTE
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//UPDATE ROUTE
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {message: newMsg} = req.body;
    // console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {
            message: newMsg,
            updated_at: new Date(),
        },
        {
            runValidators: true,
            new: true
        }
    );
    console.log(updatedChat);
    // res.send("Update route working");
    res.redirect("/chats");
})

//VERIFY ROUTE
app.get("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findById(id);
    // console.log(deletedChat);
    // res.redirect("/chats");
    res.render("verify.ejs",{deletedChat});
})

//DESTROY ROUTE
app.delete("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let dChat = await Chat.findByIdAndDelete(id);
    console.log(id);
    console.log(dChat);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("Request successful");
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});

