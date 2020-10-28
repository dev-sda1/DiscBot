const{RichEmbed} = require("discord.js");

module.exports={
    name: "info",
    category: "info",
    description: "Bot information",
    run: async(client,message)=>{
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const infoembed = new RichEmbed()
            .setColor("BLUE")
            .setAuthor("Centro Bot")
            .addField("Version", "1.2", true)
            .addField("Created by", "dev_sda3#0374")
            .addField("Uptime", `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`)
            .setDescription("Powered by [witty_name](https://github.com/dev-sda1/CentroBot)");

        await message.channel.send(infoembed);
        //Might make this formatted better later on
    }
}