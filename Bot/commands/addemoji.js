module.exports= {name:"addemoji",execute:function(message,client){const Discord=require("discord.js");const {parse}=require("twemoji-parser");const args=message.content.split(" ").slice(1);if(!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")){return message.reply("**You don\'t have permission to add emojis**")};if(!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")){return message.reply("**I need permission to add emojis**")};const emoji=args.join("");if(!emoji){return message.reply("**Please type the emoji to add**")};let the_typed_emoji=Discord.Util.parseEmoji(emoji);if(the_typed_emoji.id){const link=("https://cdn.discordapp.com/emojis/"+the_typed_emoji.id+"."+(the_typed_emoji.animated?"gif":"png")+"");const name=args.slice(1).join(" ");message.guild.emojis.create((""+link+""),(""+(name|| (""+the_typed_emoji.name+""))+"")).then((emoji)=>{return message.react(("<"+(emoji.animated?"a:":":")+""+emoji.name+":"+emoji.id+">"))})}else {let CheckEmoji=parse(emoji,{assetType:"png"});if(!CheckEmoji[0]){return message.reply("invalid emoji")};message.reply("unknown")}}}  