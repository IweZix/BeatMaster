const FastLogging = require("fastlogging");
const { readdirSync } = require('fs');

const logger = new FastLogging(true, true);

module.exports = (client) => {

    let count = 0;
    const dirsCommands = readdirSync('./commands/');
    console.log(`Commands`);

    for (const dir of dirsCommands) {

        const fileDirs = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));
        if (dir === dirsCommands[dirsCommands.length - 1]) {

            console.log(`└── 📂 ${dir}`);

            for (const file of fileDirs) {

                const command = require(`../commands/${dir}/${file}`);
                if (file === fileDirs[fileDirs.length - 1]) {
                    console.log(`    └── ${file}`);
                } else {
                    console.log(`    ├── ${file}`);
                }
                client.commands.set(command.data.name, command);
                count++;
            }
        } else {
            console.log(`├── 📂 ${dir}`);

            for (const file of fileDirs) {

                const command = require(`../commands/${dir}/${file}`);
                if (file === fileDirs[fileDirs.length - 1]) {
                    console.log(`│   └── ${file}`);
                } else {
                    console.log(`│   ├── ${file}`);
                }
                client.commands.set(command.data.name, command);
                count++;
            }
        }
    };
    logger.info(`[Commands] => ${count} logged commands`);
}