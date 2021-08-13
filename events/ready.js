const { initCommands, initSlash, initComponent, initWSEvents } = require('../init.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        initCommands(client);
        initSlash(client, process.env.GUILD, false);
        initComponent(client);
        initWSEvents(client);

        console.info(`Ready and logged in as ${client.user.tag}!`);
    }
}