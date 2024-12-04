module.exports = {
  name: 'hide',
  async execute(message, client) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
    let args = message.content.split(' ')
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel

    let role = message.guild.roles.cache.find(x => x.name == '-S')
    if (!role) role = message.guild.roles.cache.get(message.guild.id)

    try {
      await channel.permissionOverwrites.edit(role, {
        VIEW_CHANNEL: false
      })

      message.reply({
        content: `تم إخفاء ${channel} بنجاح`
      })
    } catch(err) {
      message.reply({
        content: 'حدث خطأ'
      })
    }

    
  }
}