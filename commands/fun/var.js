//VAR.js
//Why not?

const { RichEmbed } = require("discord.js");

module.exports = {
    name: "var",
    category: "fun",
    description: "why not",
    run: async (client, message, args) => {
        message.channel.send(`<:VAR:666395318203580456> Checking ${args.join(" ")}..`).then((msg) => {
            let rng = Math.floor(Math.random() * 11);
            //new Promise(resolve => setTimeout(resolve, 5000));
            console.log(rng);
            if (rng >= 5) {
                msg.edit(`<:VAR:666395318203580456> Decision: ${args.join(" ")}`);
            } else {
                msg.edit(`<:VAR:666395318203580456> Decision: **No** ${args.join(" ")}`)
            }
        });
    }
}