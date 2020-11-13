//Prerequisites
const{Client, Collection} = require("discord.js");
const config = require("./storage/config.json"); //Main bot config
const fs = require("fs");
const mongoose = require("mongoose");
const settings_model = require("./models/config.js") //Model for server settings - mongoDB based
//mongodb maybe in the near future.


//Client settings
const settings = require("./storage/server_settings.json"); //To be replaced with mongo instancing in near future
const server_rankings = require("./storage/ranks.json"); //These are here for later reference, dunno what to do with them yet.
const warnings = require("./storage/warnings.json"); //Not in use rn, may remove reference later
const tickets = require("./storage/tickets.json"); //Not in us rn, may remove reference later
const { exit } = require("process");


//Preparing the bot for use
const client = new Client(
    {
        disableMentions: 'everyone'
    }
);

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Readying the bot with anything it needs such as visual elements (rich presence)
client.on("ready", async()=>{
    console.log(`\nLogin successful as: ${client.user.username}`);

    client.user.setPresence({
        game:{
            name: 'you',
            type: "Watching",
            url: "https://dev.sda.one"
        }
    });
});

client.on("guildCreate", (guild)=>{
    console.log("Added to a server? How?");
    settings_model.findOne({ //Using guild ID as a checkpoint to find an existing list. //TODO: Check if allowed through discord privacy policy
        "_id": guild.id
    }, (err,result)=>{
        if(result){
         //somehow do some stuff here lol
        }else if (!result || err){
            //create the config or something idk
            const guild_stuff = new settings_model({
                _id: guild.id,
                log_channel: "",
                greetingschannel: "",
                joinmsg: " has joined.",
                leavemsg: " has left",
                banmsg: " has been banned :hammer:"
            })

            guild_stuff.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));

        }
    })
})

client.on("guildDelete", (guild)=>{
    console.log("away we go from a server");
    delete settings[guild.id]; //TODO: Check discord api Privacy policy to see if this can be substituted for something else 
    fs.writeFile('./storage/server_settings.json', JSON.stringify(settings, null, 2), (err)=>{
        if(err) console.warn(`[SE-SETTINGS] Error deleting guild information: ${err}`)
    })
});

//TODO: Improve detection - automatic detection disabled until then

//client.on("guildMemberAdd", member => {
//    if (Date.now() - member.createdAt < 2592000000) { //If less than 1mo old
//        let verification = client.commands.get("altflag");
//        let message = "n/a";
//        verification.run(client, message, member);
//    }
//})

client.on("message", async message=>{
    let prefix = config.prefix || ">";

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(cmd.length===0) console.log("message length is 0");

    let command = client.commands.get(cmd);

    if(!command){
        command = client.commands.get(client.aliases.get(cmd));
    }

    if(command){
        command.run(client,message,args);
    }
});

//Check if anything from the configuration file is missing.
if(config.token == null){
    console.log(`[! FATAL]: Token not found. Get your bot token from discord.com/developers/applications`);
    exit();
}

//Checking if mongodb connects successfully
try{
    mongoose.connect(config.mongodb_url, //Completely forgot about this
        {
            "auth": {
            "authSource": "admin"
            },
        "user": config.mongodb_username,
        "pass": config.mongodb_password,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}catch(e){
    console.log(`[! FATAL]: Mongodb connection failed. Check the details you added in your config.json and try again.\nFull details: ${e}`);
    exit();
}

try{
    client.login(config.token);
}catch(e){
    console.log("[! FATAL] Login failed. Check your token.");
    exit();
}


