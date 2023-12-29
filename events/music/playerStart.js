const { EmbedBuilder } = require("discord.js");
const { buttons } = require("../../assets/bot/music/buttons/playerPause");
const FastLogging = require("fastlogging");

const logger = new FastLogging(true, true);

module.exports = {

    name: "playerStart",

    async run(client, queue, track) {
        
        const embed = new EmbedBuilder()
            .setTitle("Now playing")
            .setDescription(`
                I'm now playing \`\`${track.title} - ${track.author}\`\`
                Requested by \`\`${track.requestedBy.username}\`\`
            `)
            .setColor("#AA00FF")
            .setThumbnail(track.thumbnail)
            .setURL(track.url)
            .setTimestamp();

        await queue.metadata.channel.send({ embeds: [embed], components: [buttons]})
    }
};