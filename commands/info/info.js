const{RichEmbed} = require("discord.js");

module.exports={
    name: "info",
    category: "info",
    description: "Bot information",
    run: async(client,message,args)=>{
        const infoembed = new RichEmbed()
            .setColor("BLUE")
            .setAuthor("Centro Bot")
            .addField("Version", "1.1", true)
            .addField("Created by", "dev_sda3#0374")
            .addField("Source", "The full sourcecode can be downloaded [here](https://github.com/dev-sda1/CentroBot)", true);

        message.channel.send(infoembed);
    }
}