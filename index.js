require('dotenv').config()
const { initEvents } = require('./init.js')

const { Client } = require('discord.js');
const client = new Client();

initEvents(client);
client.login(process.env.TOKEN);