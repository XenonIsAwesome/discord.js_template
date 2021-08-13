module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(client, oldM, newM) {
        if(newM.voice.channelId === client.lockiGuilds[newM.voice.guild.id].channel) {
            // User joins a voice channel
            const code = genRandCode();
            
            const ownerRole = await newM.voice.guild.roles.create({
                color: 'GOLD',
                name: `[ 👑 ] ${code}`
            });
    
            const normalRole = await newM.voice.guild.roles.create({
                name: `[ 🔑 ] ${code}`
            });
    
            const channel = await newM.voice.guild.channels.create({
                name: `[ 🔒 ] ${code}`,
                options: {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: ownerRole.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: normalRole.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ],
                    parent: client.lockiGuilds[newM.voice.guild.id].parent
                }
            });
    
            client.lockiRooms[`${newM.voice.guild.id}/${newM.voice.channelId}`] = {
                ownerRole: ownerRole.id,
                normalRole: normalRole.id,
                channel: channel.id,
    
                owner: newM.id,
                members: [newM.id]
            };
            client.members[channel.id] = [newM.id];
    
            newM.voice.setChannel(channel);
        } else {
            // User leaves a voice channel
            if (client.lockiMembers[oldM.id]) {
                c_id = `${oldM.voice.guild.id}/${oldM.voice.channelId}`
                delete client.lockiMembers[oldM.id];
    
                if (oldM.voice.channel.lockiMembers.length <= 0) {
                    const oRole = client.lockiRooms[c_id].ownerRole;
                    const nRole = client.lockiRooms[c_id].normalRole;
    
                    client.guilds.fetch(oldM.voice.guild.id).then(g => {
                        g.roles.remove(oRole);
                        g.roles.remove(nRole);
                    });
    
                    oldM.voice.channel.delete();
                    delete client.lockiRooms[c_id];
                } else if (oldM.id === client.lockiRooms[c_id].owner) {
                    // promote random user
                    const rndMem = client.lockiRooms[c_id].members[Math.floor(Math.random() * client.lockiRooms[c_id]
                        .members.length)];
                    
                    promote(client, {
                        member: { user: {id: oldM.id } },
                        guild_id: oldM.voice.guild.id
                    }, rndMem);
                }
            }
        }
    }
}