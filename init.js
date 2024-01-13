const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
.then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from:"neha",
        to:"preeti",
        message: "Send me notes for the exam",
        date: new Date(),
    },

    {
        from:"rohit",
        to:"mohit",
        message: "teach me JS Callback",
        date: new Date(),
    },

    {
        from:"amit",
        to:"sumit",
        message: "all the best!",
        date: new Date(),
    },

    {
        from:"anita",
        to:"ramesh",
        message: "bring me some fruits",
        date: new Date(),
    },

    {
        from:"tony",
        to:"peter",
        message: "love you 3000!",
        date: new Date(),
    },
];

Chat.insertMany(allChats);