const mongoose = require("mongoose");
mongoose.connect('',
        {
            "auth": {
                "authSource": ""
            },
            "user": "",
            "pass": ""
        });


const altCheck = require("../../models/potentialalts.js");
const logs = require("../../functions/logaction.js");

module.exports={
    name: "altflag",
    category: "moderation",
    description: "Flag a potential alt account",
    usage: "altflag <mention>",
    run: async(client,message,args)=>{
        if(message.deletable) message.delete();
        let altuser =  message.guild.members.get(args[0])

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!altuser) return message.reply("User cannot be found");

        const alt_flag = new altCheck({
            _id: mongoose.Types.ObjectId(),
            username: altuser,
            userid: altuser.id
        });

        alt_flag.save()
        .then(result=>console.log(result))
        .catch(err=>console.log(err));

        try{
            let lockedrole = message.guild.roles.find(role => role.name === "Awaiting Verification");
            altuser.addRole(lockedrole);
            altuser.send("Your discord account seems to be new! This is a preventative measure to stop alts quickly.\n\nTo gain access, type ``>start {your roblox username}`` in this dm to verify your account.\n**Leaving and rejoining will not do anything to lose the role. Constant leaving and rejoining may result in a ban. If you do not have a roblox account, please tell an admin for a manual verification process. Note they will not assist in any other cases**")
        }catch(e){
            console.log(e);
        }

    }
}
