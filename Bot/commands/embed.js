module.exports= {name:"embed",execute:function(message,client){if(!message.member.permissions.has("ADMINISTRATOR")){return};const args=message.content.split(" ").slice(1).join(" ");if(!args){return};let {MessageEmbed}=require("discord.js");message.channel.send({embeds:[ new MessageEmbed().setDescription(args).setFooter(message.guild.name,message.guild.iconURL()).setTimestamp().setColor("RANDOM")]});message["delete"]()}}  