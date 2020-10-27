const tblacklist = require("../../models/ticket_blacklist.js");
const ticketCheck = require("../../models/ticket.js");
const mongoose = require("mongoose");
const logs = require("../../functions/logaction.js");

const ms = require("ms");

module.exports={
    name: "ticketblacklist",
    category: "moderation",
    description: "Blacklists a user from the tag system",
    usage: "ticketblacklist <mention> <time> <reason>",
    run: async(client,message,args)=>{

        if(message.deletable) message.delete();

        let blacklisteduser = message.mentions.members.first() || message.guild.members.get(args[0])

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!blacklisteduser) return message.reply("User cannot be found");
        let time = String(args[1]);
        console.log(time);
        let reason = args.join(" ").slice(22);
        reason = reason.slice(time.length).slice(2);

        if(!time) return message.reply("Specify a time");
        if(reason === "") reason = "None specified";

        tblacklist.findOne({
            "userid": blacklisteduser.id
        }, (err,result)=>{
            if(result) return message.channel.send("This user is already blacklisted!");
            else if (err) console.log(err);
        })


        blacklisteduser.send(`You have been blacklisted from ticketing for: ${ms(ms(time))}. Any open tickets have been automatically closed.\nThe reason specified was: ${reason}`);
        message.channel.send(`:checkmark: **${blacklisteduser} has been blacklisted for ${ms(ms(time))}. Reason: ${reason}**`);

        const blacklist = new tblacklist({
            _id: mongoose.Types.ObjectId(),
            username: blacklisteduser,
            userid: blacklisteduser.id,
            duration: time,
            reason: reason,
            time: message.createdAt
        });

        blacklist.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));

        ticketCheck.findOne({
            "userid": blacklisteduser.id
        },(err, done)=>{
            if(done){
                ticketCheck.deleteMany({
                    "userid": blacklisteduser.id
                },(err)=>{
                    if(err) console.log(err);
                });
            }else if(err) console.log(err);
        });

        setTimeout(function(){
            tblacklist.deleteOne({
                "userid": blacklisteduser.id
            }, (err)=>{
                if(err) console.log(err);
            });
        }, ms(time));

    }
}
