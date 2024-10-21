// Importing the required classes and functions
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

// Listen for interactions (slash commands)
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // Handle the /pinofshame command
    if (interaction.commandName === 'pinofshame') {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const shameChannel = interaction.guild.channels.cache.find(channel => channel.name === 'wall-of-shame');
        
        if (!shameChannel) {
            return interaction.reply('Could not find a "wall-of-shame" channel.');
        }

        if (user && reason) {
            shameChannel.send(`${user} has been added to the Wall of Shame for: ${reason}`);
            await interaction.reply(`${user} was successfully pinned to the wall of shame for: ${reason}`);
        } else {
            await interaction.reply('You need to provide both a user and a reason.');
        }
    }
});

// Login to Discord with your bot's token
client.login(process.env.DISCORD_TOKEN);
