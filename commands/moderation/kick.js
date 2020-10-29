module.exports={
    name: "kick",
    category: "Moderation",
    description: "Kicks a player from the server.",
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
        }else {
            let target = message.mentions.members.last() || message.guild.members.cache.get(args[0])
            let reason = args.join(" ").slice(22) || "No reason Provided";

            let kickEmbed = new MessageEmbed()
            .setAuthor("Kick")
            .setTitle(`You have been kicked from ${message.guild.name}`)
            .addField("Reason", `${reason}`)
            .setFooter("Powered by [witty_name](https://github.com/dev-sda1/CentroBot)")
            .setColor("RED");

            await target.send(kickEmbed);
            await target.kick(reason);
        }

        
        //log stuff would go here.
    }
}