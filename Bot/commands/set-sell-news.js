const db=require("quick.db");module.exports= {name:"set-sell-news",developersOnly:true,execute:function(message,client){if(!message.member.permissions.has("ADMINISTRATOR")){return};const args=message.content.split(" ");if(!args[1]){return message.reply("**\u0645\u0646\u0634\u0646 \u0631\u0648\u0645 \u0627\u0648 \u0636\u0639 \u0627\u064a\u062f\u064a**")};const channel=message.mentions.channels.first()|| client.channels.cache["get"](args[1]);if(!channel){return message.reply("**\u0644\u0645 \u0627\u062a\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u064a \u0647\u0630\u0647 \u0627\u0644\u0631\u0648\u0645**")};if(db["get"]((""+message.guild.id+"_SELL-NEWS-ROOM"))== channel.id){return message.reply(("**"+channel+" \u0628\u0627\u0644\u0641\u0639\u0644 \u0647\u064a \u0631\u0648\u0645 \u0627\u0631\u0633\u0627\u0644 \u0627\u062e\u0628\u0627\u0631 \u0627\u0644\u0646\u0634\u0631**"))};db["set"]((""+message.guild.id+"_SELL-NEWS-ROOM"),channel.id);message.reply(("**\u062a\u0645 \u062a\u0639\u064a\u064a\u0646 "+channel+" \u0631\u0648\u0645 \u0627\u0631\u0633\u0627\u0644 \u0627\u062e\u0628\u0627\u0631 \u0627\u0644\u0646\u0634\u0631**"))}}  