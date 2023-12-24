const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    
        data: new SlashCommandBuilder()
            .setName("queue")
            .setDescription("Get 10 next music in the queue")
            .setDMPermission(false)
            .setDefaultMemberPermissions(null),
    
        async run(interaction) {

            try {

                await interaction.deferReply();
            
                const queue = useQueue(interaction.guildId);

                if (!queue?.isPlaying()) {
                    const embedError = new EmbedBuilder()
                        .setTitle("Not playing")
                        .setDescription(`I'm not playing any music`)
                        .setColor("#AA00FF")
                        .setTimestamp();
                    return await interaction.editReply({ embeds: [embedError] });
                }

                const size = queue.tracks.size;

                if (size === 0) {
                    const embedError = new EmbedBuilder()
                        .setTitle("Empty queue")
                        .setDescription(`The queue is empty`)
                        .setColor("#AA00FF")
                        .setTimestamp();
                    return await interaction.editReply({ embeds: [embedError] });
                }

                let songs = "";

                for (let i = 0; i < size && i < 10; i++) {
                    const track = queue.tracks.data[i]
                    songs += `${i+1}. ${track.title} - ${track.author}   ⏱ ${track.duration}\n`;
                }

                const embed = new EmbedBuilder()
                    .setTitle("Queue")
                    .setDescription(songs)
                    .setColor("#AA00FF")
                    .setTimestamp();

                return await interaction.editReply({ embeds: [embed] });

            } catch (error) {
                console.log(error);
                return await interaction.editReply(`There is no more music in the queue.`);
            }

        }
    };