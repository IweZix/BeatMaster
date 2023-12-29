const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const pauseButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("pause")
            .setLabel("Pause")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⏸️")
    );

module.exports = {
    pauseButton
};