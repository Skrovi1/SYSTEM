const commandsMap = require("../index").commands;
const chalk = require("chalk");
const fs = require("fs");

module.exports.run = async (client) => {
  const commandsFile = await fs.readdirSync(`./Bot/commands`);

  for (const file of commandsFile) {
    const command = require(`../Bot/commands/${file}`);
    if (!command?.name) return;
    commandsMap.set(command.name, command);
    // console.log(chalk.blue.bold('Loading') + " " + chalk.yellow.bold(`"${file.name}"`))
  }
  // console.log(chalk.hex("#079680").bold("Loaded ") + chalk.hex('#84C6E6').underline(slashCommandsMap.size) + " " + chalk.hex("#079680").bold("Commands"))
};
