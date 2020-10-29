const{MessageEmbed} = require("discord.js");
const ms = require("ms");

module.exports={
    name: "ban",
    category: "Moderation",
    description: "Bans a player from the server, either forever or for a specific time period",
    usage: "ban @dev_sda3 existing\nban @dev_sda3 7d existing",
    run: async(client,message,args)=>{

        if(args[0] == null){
            //some random stuff explaining the command goes here idk
            let explainEmbed = new MessageEmbed()
                .setAuthor(client.name, client.avatarURL)
                .setDescription(module.exports.name)
                .addField("Category", module.exports.category)
                .addField("Description", module.exports.description)
                .addField("Usage", module.exports.usage);
            await message.channel.send(explainEmbed);
        }

        let target = message.mentions.members.last() || message.guild.members.cache.get(target);
        if(!target) return message.reply("User cannot be found");
        let time = String(args[1]);
        //console.log(time);
        let reason = args.join(" ").slice(22) || "No reason provided";
        reason = reason.slice(time.length).slice(2) || "No reason provided";

        let banEmbed = new MessageEmbed()
            .setAuthor("Ban")
            .setTitle(`You have been banned from ${message.guild.name}`)
            .addField("Reason", `${reason}`)
            .setFooter("Powered by [witty_name](https://github.com/dev-sda1/CentroBot)")
            .setColor("RED");

        await target.send(banEmbed); //There's a weird space that's added to the beginning I cba to find out how to remove but it eh it does the formatting for me
        //await target.members.ban(reason);

        //log stuff would go here.

        //setTimeout(function(){
        //    target.members.unban(target,"Timeout expired");
        //    //log stuff would go here.
        //}, ms(time));

        
    }
}