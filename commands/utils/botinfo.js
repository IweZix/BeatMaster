const { Discord, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { uptime } = require("../../utils/functions")
require("dotenv").config();

module.exports = {

    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Get some info about the bot")
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),

    async run(interaction) {

        const client = interaction.client;

        const embed = new EmbedBuilder()
            .setTitle("Info about the bot")
            .setDescription(`
                __**Bot Info**__
                > **Developer : ** <@${process.env.DEVELOPER_ID}>
                > **Name : ** ${client.user.username}
                > **Discord.js : ** v
                > **Node.js : ** ${process.version}
                > **Version : ** v${process.env.VERSION}
                > **Uptime : ** ${uptime(client.uptime)}

                __**Bot Info**__
                > **Created at : ** ${client.user.createdAt}`
            )
            .setColor("#AA00FF")
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({text: `© 2024 | ${client.user.username}`})
            .setTimestamp();


            
        
        await interaction.reply({ embeds: [embed] });
    }

};
