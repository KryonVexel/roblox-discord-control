const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

let lastCommand = {};

app.get("/commands", (req,res)=>{
    res.json(lastCommand);
    lastCommand = {};
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("messageCreate", msg => {

    if(msg.content.startsWith("/kill")) {

        const args = msg.content.split(" ");
        const playerName = args[1];

        lastCommand = {
            kill: playerName
        };

        msg.reply("Игрок будет уничтожен 😈");

    }

});

client.login(process.env.TOKEN);

app.listen(3000, ()=>{
    console.log("Server running");
});
