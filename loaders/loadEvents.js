const FastLogging = require("fastlogging");
const { readdirSync } = require("fs");

const logger = new FastLogging(true, true);

module.exports = (client) => {

    let count = 0;
    const dirsEvents = readdirSync("./events/");

    for (const dir of dirsEvents) {
        const filesDirs = readdirSync(`./events/${dir}/`).filter(f => f.endsWith(".js"));
        for (const file of filesDirs) {
            const event = require(`../events/${dir}/${file}`)
            if (dir === "music")
                client.player.events.on(event.name, (...args) => event.run(client, ...args));
            client.on(event.name, (...args) => event.run(client, ...args));
            count++;
        };
    };

    logger.info(`[Events] => ${count} logged events`);
}