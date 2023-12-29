const { ComponentType, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {

    name: "back",
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
                await queue.history.back();
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