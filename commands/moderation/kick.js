module.exports={
    name: "kick",
    category: "Moderation",
    description: "Kicks a player from the server.",
    run: async(client,message,args)=>{
        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        let reason = args.join(" ").slice(22) || "No reason Provided";
        //reason = reason.slice(time.length).slice(2);
        console.log(reason);
        console.log(target);
        target.send(`You have been kicked from ${message.guild.name} for:${reason}`);
        target.kick(reason);

        //log stuff would go here.
    }
}