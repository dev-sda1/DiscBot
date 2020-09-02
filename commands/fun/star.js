//Star.js
//Basically a starboard lmao
//TODO: Add starboard configurations
const{RichEmbed} = require("discord.js");
const config = require("../../storage/config.json"); //this will be removed soon with the server config stuff


module.exports={
    name: "star",
    category: "fun",
    description: "Allows a moderator to 'star' a message for everyone to see lol",
    usage: `${config.prefix} [message id]`,
    run: async(client,message,args)=>{
        message.channel.fetchMessage(args[0]).then(msg =>{
            if(message.deletable) message.delete();
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

            const starboard_id = "750108605679796224";
            let image = "";
            let txt = msg.content || "Attachment";
            msg.attachments.forEach(attachment=>{
                image = attachment.url || "";
            });

            if(image == null){
                let starEmbed_withImage = new RichEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL)
                    .setDescription(msg.content)
                    .addField("Original", `[Jump to message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[0]})`)
                client.channels.get(starboard_id).send(`:star: <#${message.channel.id}> ID: ${args[0]}`,starEmbed_withImage)
            }else{
                let starEmbed_withImage = new RichEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL)
                    .setDescription(txt)
                    .addField("Original", `[Jump to message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[0]})`)
                    .setImage(image || "");
                client.channels.get(starboard_id).send(`:star: <#${message.channel.id}> ID: ${args[0]}`,starEmbed_withImage);
            }
            //console.log(target.content);

            //log stuff would go here.
        }).catch(err=>console.log(err));
        if(args == null){
            //some random stuff explaining the command goes here idk
            let explainEmbed = new RichEmbed()
                .setAuthor(client.name, client.avatarURL)
                .setDescription(module.exports.name)
                .addField("Category", module.exports.category)
                .addField("Description", module.exports.description)
                .addField("Usage", module.exports.usage);
            await message.channel.send(explainEmbed);
        }
    }
}