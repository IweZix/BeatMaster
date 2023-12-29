const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("back")
            .setLabel("Back")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⏮"),
        new ButtonBuilder()
            .setCustomId("pause")
            .setLabel("Pause")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⏸"),
        new ButtonBuilder()
            .setCustomId("skip")
            .setLabel("Skip")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⏭"),
        new ButtonBuilder()
            .setCustomId("stop")
            .setLabel("Stop")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⏹")
    );

module.exports = {
    buttons
};