const { ComponentType, EmbedBuilder } = require("discord.js");

module.exports = {

    name: "ping",
    type: ComponentType.Button,

    async run(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("Ping")
            .setDescription(`Ping : \`${interaction.client.ws.ping}\`.`)
            .setColor("#AA00FF")
            .setFooter({text: `© 2024 | ${interaction.client.user.username}`})
            .setTimestamp();

        await interaction.message.edit({ embeds: [embed] })
        await interaction.deferUpdate();
    }
};