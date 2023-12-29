const { ComponentType, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { pauseButton } = require("../../assets/bot/music/buttons/pause");

module.exports = {

    name: "resume",
    type: ComponentType.Button,

    async run(interaction) {

        try {

            const queue = useQueue(interaction.guild.id);
            if (!queue || !queue.isPlaying())
                return interaction.followUp("I don't play any music.");

            const voiceChannelMember = interaction.member.voice.channel;
            const voiceChannelBot = (await interaction.guild.members.fetch(interaction.client.user.id)).voice.channel;
            if (!voiceChannelMember) 
                return interaction.followUp("You're not in a voice channel.");
            if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) 
                return interaction.followUp("You're not in the same voice channel as the bot.");

            try {
                if (queue.node.isPaused()) {
                    queue.node.resume();

                    track = queue.history.currentTrack;

                    const embed = new EmbedBuilder()
                        .setTitle("Music Playing")
                        .setDescription(`
                            I'm now playing \`\`${track.title} - ${track.author}\`\`
                            Requested by \`\`${track.requestedBy.username}\`\`
                        `)
                        .setColor("#AA00FF")
                        .setThumbnail(track.thumbnail)
                        .setURL(track.url)
                        .setTimestamp();
                    await interaction.message.edit({ embeds: [embed], components: [pauseButton] });
                } else {
                    await interaction.followUp("The music is already playing.");
                }
            } catch (error) {
                console.error(error);
                await interaction.followUp("An error occurred with the command.");
            }
        } catch (error) {
            console.log(error);
            await interaction.followUp("An error occurred with the command.");
        }
        await interaction.deferUpdate();
    }
};