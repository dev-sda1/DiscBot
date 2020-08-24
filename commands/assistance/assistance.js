//TODO: REWRITE TICKET OPTION SELECTION SYSTEM


const{RichEmbed} = require("discord.js");
const{promptMessage, promptMessageString} = require("../../functions.js")
const mongoose = require("mongoose");
const ticket = require("../../models/ticket.js");
const tblacklist = require("../../models/ticket_blacklist.js");

mongoose.connect('',
        {
            "auth": {
                "authSource": ""
            },
            "user": "",
            "pass": "",
            useNewUrlParser: true
        });

let fullTicket = [];

let actuallythroughdm = false;

function moderationIssue(client,message){
    console.log("MOD ISSUE");
    let embed2 = new RichEmbed()
        .setColor("BLUE")
        .setAuthor("Moderation issue")
        .setDescription("OK - What role does this concern?")
        .addField("1️⃣", "Moderators")
        .addField("2️⃣", "Admins")
        .addField("❌", "Cancel Ticket");

    message.author.send(embed2).then(async msg2 => {
        let emoji2 = await promptMessage(msg2, message.author, 60, ["1️⃣", "2️⃣", "❌"]);

        switch(emoji2){
            case "1️⃣":
                let embed2 = new RichEmbed()
                .setColor("BLUE")
                .setAuthor("Moderation issue - Moderator Role")
                .setDescription("Alright, it's a moderator issue. Can you briefly describe your issue? (Please also include any screenshot links here too) **Times out in 300s**")
                
                message.author.send(embed2).then(async msg3 => {
                //console.log(msg3);
                    let response = await promptMessageString(msg3, message.author, 300);
                    fullTicket[0] = "Moderator Issue";
                    fullTicket[1] = response;
                    fullTicket[2] = message.author.id;
                processTicket(client,message,fullTicket);
            });

            case "2️⃣":
                let embed3 = new RichEmbed()
                .setColor("BLUE")
                .setAuthor("Moderation issue - Admin Role")
                .setDescription("Alright, it's an admin issue. Can you briefly describe your issue? (Please also include any screenshot links here too) **Times out in 300s**")
                message.author.send(embed3).then(async msg3 => {
                    let response = await promptMessageString(msg3, message.author, 300);
                    fullTicket[0] = "Admin Issue";
                    fullTicket[1] = response;
                    fullTicket[2] = message.author.id;
                processTicket(client,message,fullTicket);
            });
            case "❌":
                return true;

            default:
                return message.send("An error occured");
        }
    });
}

function generalQuery(client,message){
    let embed2 = new RichEmbed()
        .setColor("BLUE")
        .setAuthor("General Query")
        .setDescription("Can you describe what you're contacting us for? (Please also include any screenshot links here) **Times out in 300s. Type ``cancel`` to go back**");
    message.author.send(embed2).then(async msg3 => {
        let response = await promptMessageString(msg3, message.author, 300);
        if(String(response).toLowerCase() === "cancel"){
            console.log("CANCELLED");
            return mainMenu(client,message);
        }
        fullTicket[0] = "Other";
        fullTicket[1] = response;
        fullTicket[2] = message.author.id;
        processTicket(client,message,fullTicket);
});  
}

function mainMenu(client,message){
    let embed = new RichEmbed()
        .setColor("BLUE")
        .setAuthor("Centro Travel")
        .addField("Welcome to our DM menu. What are you using me for?", "Select an option below")
        .addField("1️⃣", "General Query")
        .addField("2️⃣", "Moderation Conerns")
        .setDescription("This dialog will stop working after 60 seconds. If 60 seconds pass you will need to tag the bot again");

    message.author.send(embed).then(async msg => {
        let emoji = await promptMessage(msg, message.author, 60, ["1️⃣", "2️⃣"]);

        switch (emoji){
            case "1️⃣":
                generalQuery(client,message);
                break;
            case "2️⃣":
                moderationIssue(client,message);
                break;
            default:
                return message.send("An error occured.");
        }

        //if (emoji === "1️⃣") { //MODERATION ISSUE
        //    let c = generalQuery(client, message);
        //    console.log("Checking if cancelled");
        //    
        //} else if (emoji === "2️⃣") { //OPTION NOT LISTED (OTHER)
        //    let c = moderationIssue(client, message);
        //    console.log("Checking if cancelled");
       // }
    });
}

function processTicket(client,message,fullTicket){
    let generatedID = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
    const botTicketsChannel="698336235382374470";

    const ticket_entry = new ticket({
        _id: mongoose.Types.ObjectId(),
        username: `<@${message.author.id}>`,
        userid: message.author.id,
        ticketid: generatedID,
        ticket_type: fullTicket[0],
        message: fullTicket[1],
        closed: false,
        time: message.createdAt
    });

    ticket_entry.save()
    .then(result=>console.log(result))
    .catch(err=>console.log(err));

    let ticketEmbedClient = new RichEmbed()
        .setColor("GREEN")
        .setAuthor("Ticket submitted!")
        .setDescription(`Your ID: ${generatedID}\nYou should recieve a response within 24 hours.\n**If you submitted a suggestion, it may not get a response but it will have been read**`)
        .addField("Username", `<@${fullTicket[2]}>`)
        .addField("Ticket Type", fullTicket[0])
        .addField("Message", fullTicket[1]);

    let ticketEmbedAdmin = new RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Ticket ${generatedID}`)
        .addField("Username", `<@${fullTicket[2]}>`)
        .addField("Ticket Type", fullTicket[0])
        .addField("Message", fullTicket[1]);

    client.channels.get(botTicketsChannel).send(ticketEmbedAdmin);
    message.author.send(ticketEmbedClient);
}


module.exports={
    name: "assistance",
    category: "assistance",
    description: "TICKETING AND ASSISTACE",
    run: async(client,message,actuallyactivated)=>{
        if(message.deletable) message.delete();

        tblacklist.findOne({
            userid: message.author.id
        },(err, blacklisted)=>{
            if(err) console.log(err);
            if(blacklisted){
                return;
            }else{
                fullTicket = [];

                actuallythroughdm = actuallyactivated;
                if(!actuallythroughdm) return;
        
                mainMenu(client,message);
            }
        })

        


    }
}
