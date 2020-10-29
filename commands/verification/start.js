const{MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
const noblox = require("noblox.js");

const altCheck = require("../../models/potentialalts.js");

module.exports={
    name: "start",
    category: "verification",
    description: "begins_alt_check",
    usage: "start <roblox name>",
    run: async(client,message,args)=>{
        if(message.guild) return console.log("Start command was ran in a chat, not DM"); //If it's not dm then it won't work
        
        const rbx_name = args[0];
        if(!rbx_name) return message.channel.send("Specify a roblox name to begin");

        //Checking if the user even has the role in the server
        altCheck.findOne({
            userid: message.author.id
        },(err, altmaybe)=>{
            if(err) console.log(err);
            if(!altmaybe) return;
        })

        //roblox api here.
        let rbx_id = null;
        let f_rbx_name = null;
        let pInfo = null;

        rbx_id = await noblox.getIdFromUsername(rbx_name);
        f_rbx_name = await noblox.getUsernameFromId(rbx_id);

        console.log("This user's ID is: "+rbx_id);

        pInfo = await noblox.getPlayerInfo(rbx_id);
        console.log("This player's account age is: "+pInfo.age)

        //create the embed here

        const logchannel = "697207068356116512";

        const altCheckEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Alt Verification")
            .setThumbnail(`https://web.roblox.com/Thumbs/Avatar.ashx?x=512&y=512&Format=Png&userid=${rbx_id}`)
            .addField("Username", f_rbx_name, true)
            .addField("Account Age", pInfo.age, true)
            .addField("Owned by", message.author);

        client.channels.cache.get(logchannel).send(altCheckEmbed);
        message.reply("Information sending successful. **Please wait at least 24hrs before asking about the status of your check**");
    }
}
