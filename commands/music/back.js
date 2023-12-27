const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("back")
        .setDescription("Replay the last song")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction) {

        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying())
            return interaction.followUp("I don't play any music.");

        if (!queue.history.previousTrack)
            return interaction.followUp("I don't have any previous music.");

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetch(interaction.client.user.id)).voice.channel;

        if (!voiceChannelMember) 
            return interaction.followUp("You're not in a voice channel.");

        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) 
            return interaction.followUp("You're not in the same voice channel as the bot.");

        try {
            await queue.history.back();
            await interaction.reply("The previous music is now playing.");
        } catch (error) {
            console.error(error);
            await interaction.followUp("An error occurred while playing the previous music.");
        }
    }
};
