const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the music")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction) {

        try {
            await interaction.deferReply({ephemeral: true});

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
                    await interaction.followUp("The music is now playing.");
                } else {
                    await interaction.followUp("The music is already playing.");
                }
            } catch (error) {
                console.error(error);
                await interaction.followUp("An error occurred with the command.");
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp("An error occurred with the command.");
        }
    }
};
