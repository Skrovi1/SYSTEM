module.exports = {
  name: 'help',
  description: 'Displays a list of available commands.',
  execute(message, args) {
    const { commands } = require('../../index');

    const helpMessage = 'List of available commands:\n';
    const commandList = commands.map((command) => `- **${command.name}**: ${command.description}`);

    const maxChunkLength = 2000 - helpMessage.length;
    let currentChunk = helpMessage;

    for (const command of commandList) {
      if (currentChunk.length + command.length > maxChunkLength) {
        message.channel.send(currentChunk);
        currentChunk = '';
      }
      currentChunk += `${command}\n`;
    }

    if (currentChunk) {
      message.channel.send(currentChunk);
    }
  },
};