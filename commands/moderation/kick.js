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
            let target = message.mentions.members.first() || message.guild.members.get(args[0])
            let reason = args.join(" ").slice(22) || "No reason Provided";
            //reason = reason.slice(time.length).slice(2);
            console.log(reason);
            console.log(target);
            await target.send(`You have been kicked from ${message.guild.name} for:${reason}`);
            await target.kick(reason);
        }

        
        //log stuff would go here.
    }
}