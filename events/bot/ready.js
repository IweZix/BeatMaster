const FastLogging = require("fastlogging");
const { Events, ActivityType } = require("discord.js")

const logger = new FastLogging(true, true);

module.exports = {

    name: Events.ClientReady,

    async run(client) {

        await client.application.commands.set(client.commands.map(command => command.data))
        logger.info(`[SlashCommands] => loaded`)

        client.user.setActivity("music", {type: ActivityType.Listening});
        
        logger.success(`[Bot] => ${client.user.username} is online`);
    }
};
