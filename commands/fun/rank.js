//Coins.js
//Shows user their coins balance.

const { RichEmbed } = require("discord.js");

module.exports = {
    name: "rank",
    category: "fun",
    description: "Displays your server XP and rank.",
    run: async (client, message, args) => {
        let usr = message.author;

        console.log(message.author.avatar);

        const infoembed = new RichEmbed()
            .setColor("ORANGE")
            .setAuthor(`Balance for ${message.author.username}`)
            .setThumbnail(message.author.avatarURL)
            .setDescription("Use >store to redeem currency")
            .addField("Coins", "200");


        message.channel.send(infoembed);
    }
}