const FastLogging = require("fastlogging");
const { readdirSync } = require('fs');

const logger = new FastLogging(true, true);

module.exports = async (client) => {

    let count = 0;
    const dirsCommands = readdirSync('./commands/');

    for (const dir of dirsCommands) {
        const fileDirs = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));
        // console.log(`📂 ${dir}`);
        for (const file of fileDirs) {
            const command = require(`../commands/${dir}/${file}`);
            // console.log(`└── ${command.data.name}`);
            client.commands.set(command.data.name, command);
            count++;
        }
    };

    logger.info(`[Commands] => ${count} logged commands`);
}