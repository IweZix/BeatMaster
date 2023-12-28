const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a music")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addStringOption(opt => opt
            .setName("song")
            .setDescription("The song to play").setRequired(true)
        ),

    async run(interaction) {
        
        try {
            await interaction.deferReply({ephemeral: true});

            const song = interaction.options.getString("song");

            const voiceChannelMember = interaction.member.voice.channel;
            const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

            if (!voiceChannelMember) 
                return interaction.followUp("You're not in a voice channel.");
            if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) 
                return interaction.followUp("You're not in the same voice channel than the bot.");

            try {
                const { track } = await interaction.client.player.play(voiceChannelMember, song, {
                    requestedBy: interaction.user,
                    nodeOptions: {
                        metadata: interaction,
                        volume: 70,
                        leaveOnStop: true,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        selfDeaf: true
                    }
                });

                await interaction.followUp(`\`${track.title}\` during \`${track.duration}\` is added to the queue.`);
            } catch (e) {
                return await interaction.followUp(`The music \`${song}\` wasn't found.`);
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp("An error occurred with the command.");
        }
        

        
    }
};
