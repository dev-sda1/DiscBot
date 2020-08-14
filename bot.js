//Prerequisites
const{Client, RichEmbed, Collection} = require("discord.js");
const config = require("./storage/config.json");
const fs = require("fs");
//mongodb maybe in the near future.


//Client settings
const settings = require("./storage/server_settings.json");
const server_rankings = require("./storage/ranks.json");
const warnings = require("./storage/warnings.json");
const tickets = require("./storage/tickets.json")


//Preparing the bot for use
const client = new Client({
    disableEveryone: true //stops people trying to do @everyone on commands
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



// //Command handling (not used anymore but kept as a backup)
// fs.readdir("./commands/", (err,file)=>{
//     if(err) console.log(err); //if error it logs it in console because fuck doing actual responses

//     let jsfile = file.filter(f => f.split(".").pop() === "js");
//     if(jsfile.length <=0){
//         console.log("Commands couldn't be found."); //If the folder either doesn't exist or is empty
//         return;
//     }

//     jsfile.forEach((f, i)=>{
//         let props = require(`./commands/${f}`);
//         console.log(`${f} loaded`);
//         client.commands.set(props.help.name, props);
//     });
// });


//Bot
client.on("ready", async()=>{
    console.log(`\nHi! ${client.user.username} is now online!`);

    client.user.setPresence({
        game:{
            name: 'trains at Moor St',
            type: "Watching",
            url: "https://dev.sda.one"
        }
    });
});

client.on("guildCreate", (guild)=>{
    console.log("Added to a server? How?");
    if(!settings[guild.id]){
        settings[guild.id] = {
            prefix: ".",
            mod_logs: "",
            greetingschannel: "",
            joinmsg: " has joined.",
            leavemsg: " has left",
            banmsg: " has been banned :hammer:"
        }
    }
    fs.writeFile("./storage/server_settings.json", JSON.stringify(settings, null, 2), (err)=>{
        if(err) console.warn(`[SE-SETTINGS] Error creating guild information: ${err}`);
    })
})

client.on("guildDelete", (guild)=>{
    console.log("away we go from a server");
    delete settings[guild.id];
    fs.writeFile('./storage/server_settings.json', JSON.stringify(settings, null, 2), (err)=>{
        if(err) console.warn(`[SE-SETTINGS] Error deleting guild information: ${err}`)
    })
});

client.on("guildMemberAdd", member => {
    if (Date.now() - member.createdAt < 2592000000) {
        let verification = client.commands.get("altflag");
        let message = "n/a";
        verification.run(client, message, member);
    }
})

client.on("message", async message=>{
    let prefix = ">";

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


//Logging into the bot hopefully.
client.login(config.token);
