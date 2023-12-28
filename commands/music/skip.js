const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    
        data: new SlashCommandBuilder()
            .setName("skip")
            .setDescription("Play the next music in the queue")
            .setDMPermission(false)
            .setDefaultMemberPermissions(null),
    
        async run(interaction) {

            try {

                await interaction.deferReply({ ephemeral: true });

                const voiceChannelMember = interaction.member.voice.channel;
                const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;

                if (!voiceChannelMember) 
                    return interaction.followUp("You're not in a voice channel.");
                if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) 
                    return interaction.followUp("You're not in the same voice channel than the bot.");
            
                const queue = useQueue(interaction.guildId);

                if (!queue?.isPlaying()) {
                    const embedError = new EmbedBuilder()
                        .setTitle("Not playing")
                        .setDescription(`I'm not playing any music`)
                        .setColor("#AA00FF")
                        .setTimestamp();
                    return await interaction.followUp({ embeds: [embedError] });
                }

                const result = queue.node.skip();

                if (!result) {
                    return await interaction.followUp(`There is no more music in the queue.`);
                }

                return await interaction.followUp(`I skipped the music !`);

            } catch (error) {
                return await interaction.followUp(`There is no more music in the queue.`);
            }

        }
    };