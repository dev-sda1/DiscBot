const{RichEmbed} = require("discord.js");

module.exports={
    name: "info",
    category: "info",
    description: "Bot information",
    run: async(client,message,args)=>{
        const infoembed = new RichEmbed()
            .setColor("BLUE")
            .setAuthor("Centro Bot")
            .addField("Version", "1.4a", true)
            .addField("Created by", "dev_sda3#0374")
            .addField("What is this?", "A bot.", true)
            .addField("Note", "Bot is in development. This'll eventually grow to more in the near future.",true);

        message.channel.send(infoembed);
    }
}