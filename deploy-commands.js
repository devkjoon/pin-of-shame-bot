const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

// Define the /pinofshame command with two options: user and reason
const commands = [
    new SlashCommandBuilder()
        .setName('pinofshame')
        .setDescription('Pins a user to the Wall of Shame with a reason')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('The user to pin to the wall of shame')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
            .setDescription('The reason for pinning the user')
            .setRequired(true))
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Register the updated commands to your server
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
