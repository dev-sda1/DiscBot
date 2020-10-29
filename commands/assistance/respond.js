const {RichEmbed} = require('discord.js');
const ticketCheck = require("../../models/ticket.js");
const mongoose = require("mongoose");
const logs = require("../../functions/logaction.js");

const{promptMessage, promptMessageString} = require("../../functions/responses.js")


module.exports={
    name: "respond",
    category: "assistance",
    description: "Responds to a user's ticket",
    usage: "respond <ticketID> <message>",
    run: async(client,message,args)=>{
        console.log("Warn command activated:TM:");

        if(message.deletable) message.delete();
        
        let ticketID = args[0]
        let response = args.join(" ").slice(String(ticketID).length);

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!ticketID) return message.reply("Ticket cannot be found");

        let responseEmbed = new RichEmbed()
            .setAuthor(`You have a response from <@${message.author.id}> regarding ticket ${ticketID}`)
            .setColor("BLUE")
            .addField("Message", `${response}\n\nDid this answer your query?`)

        let didntAnswer = new RichEmbed()
            .setAuthor(`Oh dear`)
            .setColor("RED")
            .setDescription("Enter a reply to send back **Times out in 300s**");

        let answered = new RichEmbed()
            .setAuthor(`Thank you!`)
            .setColor("GREEN")
            .setDescription("This query has been closed, and no more replies can now be added to it.\nPlease start a new query for any other concerns");
        
        let ticketClosedSolved = new RichEmbed()
            .setColor("RED")
            .setAuthor(`${ticketID} closed`)
            .addField("Reason", "Marked as solved");


        message.channel.send("Finding ticket..");
        let botTicketsChannel = "698336235382374470";


        ticketCheck.findOne({
            ticketid: ticketID
        },(err, foundTicket)=>{
            if(err) console.log(err);
            if(!foundTicket){
                return message.channel.send("Ticket couldn't be found, or has been recently closed.");
            }else{
                let user = message.guild.members.cache.get(foundTicket.userid);
                console.log(user);
                user.send(responseEmbed).then(async msg =>{
                    let emoji2 = await promptMessage(msg, user, 60, ["✅", "❌"]);
                            
                    if(emoji2 === "✅"){
                        ticketCheck.deleteOne({
                            ticketid: ticketID
                        }, (err)=>{
                            if(err) console.log(err);
                        })
                        client.channels.cache.get(botTicketsChannel).send(ticketClosedSolved);
                        return user.send(answered);
                    }else if(emoji2 === "❌"){
                        user.send(didntAnswer).then(async msg2=>{
                            let replytoResponse = await promptMessageString(msg2, message.author, 300);

                            let ticketEmbedClient = new RichEmbed()
                                .setColor("GREEN")
                                .setAuthor("Response submitted!")
                                .setDescription(`Your ID: ${ticketID}\nYou should recieve a response within 24 hours.`)
                                .addField("Message", replytoResponse);

                            let ticketEmbedAdmin = new RichEmbed()
                                .setColor("ORANGE")
                                .setAuthor(`Response to ${ticketID}`)
                                .addField("Username", `<@${user}>`)
                                .addField("Message", replytoResponse);

                            client.channels.cache.get(botTicketsChannel).send(ticketEmbedAdmin);
                            user.send(ticketEmbedClient);
                        })
                    }
                });
            }
        })

        message.channel.send(`:checkmark: Ticket response has been sent for ${ticketID}`);
    }
}