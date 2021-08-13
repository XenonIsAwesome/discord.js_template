module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client, msg) {
        parent = guild.channels.create('[ 🔒 ] Locki Channels', {
            type: 'category'
        });
    
        channel = guild.channels.create('🔒 Join to create a room', {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [Permissions.FLAGS.SPEAK]
                }
            ],
            parent: parent
        });
    
        client.lockiGuilds[guild.id] = {
            parent: parent.id,
            channel: channel.id
        };
    }
}