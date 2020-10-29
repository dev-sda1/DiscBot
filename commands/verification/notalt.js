const mongoose = require("mongoose");

const altCheck = require("../../models/potentialalts.js");
const logs = require("../../functions/logaction.js");

module.exports={
    name: "notalt",
    category: "moderation",
    description: "Removes the alt flag off an account",
    usage: "notalt <mention>",
    run: async(client,message,args)=>{
        if(message.deletable) message.delete();
        let altuser = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!altuser) return message.reply("User cannot be found");

        altCheck.findOne({
            userid: message.author.id
        },(err, altmaybe) =>{
            if(err) console.log(err);
            if(!altmaybe){
                return;
            }else{
                altCheck.deleteOne({
                    userid: message.author.id
                },(err) =>{
                    if(err) console.log(err);
                })        
            }
        })
        
        let lockedrole = message.guild.roles.find(role => role.name === "Awaiting Verification");
        altuser.roles.remove(lockedrole);

        altuser.send("Our staff have given your account the green light to continue. If you believe your flag was a mistake, please let the mods know and we'll investigate");
    }
}
