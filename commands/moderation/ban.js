module.exports={
    name: "ban",
    category: "Moderation",
    description: "Bans a player from the server, either permenately or for a specific time period",
    run: async(client,message,args)=>{
        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        let time = String(args[1])
        let reason = args.join(" ").slice(22) || "No reason Provided";
        reason = reason.slice(time.length || 0);
        console.log(reason);
        console.log(target);
        target.send(`You have been banned from ${message.guild.name} for:${reason}`); //There's a weird space thats added to the beginning I cba to find out how to remove but it eh it does the formatting for me
        target.ban(reason);

        //log stuff would go here.

        setTimeout(function(){
            target.unban();
            //log stuff would go here.
        }, ms(time));

        
    }
}