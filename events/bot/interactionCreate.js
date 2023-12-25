const { Events, InteractionType, PermissionsBitField } = require("discord.js");

module.exports = {

    name: Events.InteractionCreate,

    async run(client, interaction) {

        switch (interaction.type) {

            case InteractionType.ApplicationCommand:
                const command = client.commands.get(interaction.commandName);
                if (command.data.default_member_permissions && !interaction.member.permissions.has(new PermissionsBitField(command.data.default_member_permissions))) {
                    return await interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
                }

                command.run(interaction)
            break;

            /**
             * Get the button name and args
             * exemple : ban_1234567890_reason
             * => [ban, 1234567890, reason]
             */
            default:
                const name = interaction?.customId?.split("_")[0];
                const args = interaction?.customId?.split("_").slice(1);
                const file = client.interactions.find(file => file.name === name && file.type === interaction.componentType);
                if (!file) return;

                if (file.permission && !interaction.member.permissions.has(new PermissionsBitField(file.permission))) {
                    return await interaction.reply({ content: "You don't have permission to use this button.", ephemeral: true });
                }

                await file.run(interaction, ...args);
            break;
        };
    }
};