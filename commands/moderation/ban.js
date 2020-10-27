const{RichEmbed} = require("discord.js");
const ms = require("ms");

module.exports={
    name: "ban",
    category: "Moderation",
    description: "Bans a player from the server, either forever or for a specific time period",
    usage: "ban @dev_sda3 existing\nban @dev_sda3 7d existing",
    run: async(client,message,args)=>{

        if(args == null){
            //some random stuff explaining the command goes here idk
            let explainEmbed = new RichEmbed()
                .setAuthor(client.name, client.avatarURL)
                .setDescription(module.exports.name)
                .addField("Category", module.exports.category)
                .addField("Description", module.exports.description)
                .addField("Usage", module.exports.usage);
            await message.channel.send(explainEmbed);
        }

        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        let time = String(args[1])
        let reason = args.join(" ").slice(22) || "No reason Provided";
        reason = reason.slice(time.length || 0);
        console.log(reason);
        console.log(target);
        await target.send(`You have been banned from ${message.guild.name} for:${reason}`); //There's a weird space that's added to the beginning I cba to find out how to remove but it eh it does the formatting for me
        await target.ban(reason);

        //log stuff would go here.

        setTimeout(function(){
            target.unban(target,"Timeout expired");
            //log stuff would go here.
        }, ms(time));

        
    }
}