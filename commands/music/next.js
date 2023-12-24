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
            
                const queue = useQueue(interaction.guildId);

                if (!queue?.isPlaying()) {
                    const embedError = new EmbedBuilder()
                        .setTitle("Not playing")
                        .setDescription("I'm not playing any music")
                        .setColor("#AA00FF")
                        .setTimestamp();
                    return await interaction.editReply({ embeds: [embedError] });
                }

                queue.node.skip();

                const embed = new EmbedBuilder()
                    .setTitle("Track skipped !")
                    .setDescription("The next music is playing")
                    .setColor("#AA00FF")
                    .setTimestamp();
                return await interaction.editReply({ embeds: [embed] });
            } catch (error) {
                console.log(error);
                return;
            }

        }
    };