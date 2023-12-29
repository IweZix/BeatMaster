const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const resumeButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("resume")
            .setLabel("Resume")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("▶")
    );

module.exports = {
    resumeButton
};