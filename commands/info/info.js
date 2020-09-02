const{RichEmbed} = require("discord.js");

module.exports={
    name: "info",
    category: "info",
    description: "Bot information",
    run: async(client,message)=>{
        const infoembed = new RichEmbed()
            .setColor("BLUE")
            .setAuthor("Centro Bot")
            .addField("Version", "1.14a", true)
            .addField("Created by", "dev_sda3#0374")
            .addField("Powered by [witty_name]", "[Add to Server](https://github.com/dev-sda1/CentroBot)", true);

        await message.channel.send(infoembed);
        //Might make this formatted better later on
    }
}