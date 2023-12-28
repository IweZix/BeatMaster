const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("setvolume")
        .setDescription("Set the volume of the music")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addNumberOption(option => option
            .setName('volume')
            .setDescription('The volume to set')
            .setRequired(true)
            .setMaxValue(200)
            .setMinValue(0)
        ),

    async run(interaction) {

        try {
            await interaction.deferReply({ephemeral: true});

            const queue = useQueue(interaction.guild.id);
            if (!queue || !queue.isPlaying())
                return interaction.reply("I don't play any music.");
        

            const voiceChannelMember = interaction.member.voice.channel;
            const voiceChannelBot = (await interaction.guild.members.fetch(interaction.client.user.id)).voice.channel;
            if (!voiceChannelMember) {
                return interaction.followUp("You're not in a voice channel.");
            }
            if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) {
                return interaction.followUp("You're not in the same voice channel as the bot.");
            }

            const volume = interaction.options.getNumber("volume");
            
            try {
                if (queue.node.volume === volume) {
                    await interaction.followUp(`The volume is already set to \`${volume}\`.`);
                } else {
                    queue.node.setVolume(volume);
                    await interaction.followUp(`The volume is now set to \`${volume}\`.`);
                }
            } catch (error) {
                console.error(error);
                await interaction.followUp("An error occurred while playing the previous music.");
            }
        
        } catch (error) {
            console.error(error);
            await interaction.followUp("An error occurred with the command.");
        }
    }
};
