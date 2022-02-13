const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
let status, badges

module.exports.run = async (client,message) => {

    let user = message.mentions.users.first();
    let rainbow = client.emojis.cache.get('941016254133698570');


    try {

        if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        if ( user === undefined ){ user = message.author }

        await message.channel.bulkDelete(1)

        if ( user.presence.status === 'dnd' ){ status = 'DND' } else
        if ( user.presence.status === 'offline' ){ status = 'Offline' } else
        if ( user.presence.status === 'online' ){ status = 'Online' } else
        if ( user.presence.status === 'idle' ){ status = 'AFK' }

        let badgesList = {
            ['creator']: {
                stick: client.emojis.cache.get('941419333043781722'),
                name: 'DevTeam'
            },

            ['support']: {
                stick: client.emojis.cache.get('941405631066296330'),
                name: 'Support'
            },

            ['admin']: {
                stick: client.emojis.cache.get('941619185396645919'),
                name: 'Admin'
            },

            ['partner']: {
                stick: client.emojis.cache.get('941406330009296956'),
                name: 'Official Partner'
            },

            ['mod']: {
                stick: client.emojis.cache.get('941423774480363520'),
                name: 'Mod'
            },

            ['youtube']: {
                stick: client.emojis.cache.get('941652637449871400'),
                name: 'YouTube'
            },

            ['twitch']: {
                stick: client.emojis.cache.get('941652638058024970'),
                name: 'Twitch'
            },

            ['sponsor']: {
                stick: client.emojis.cache.get('941419388861571112'),
                name: 'Sponsor'
            },

            ['friend']: {
                stick: client.emojis.cache.get('941648308282208306'),
                name: 'Friend'
            }
        }

        badges = ''

        if ( Umeko.fileExists( './././data/badges/' + user.id + '.txt' ) ) {

            let bdata = Umeko.readFile('./././data/badges/' + user.id + '.txt').split(' ')
            badges = ''

            for (let i = 0; i < bdata.length; i++) {

                badges += `${badgesList[bdata[i]].stick} - **${badgesList[bdata[i]].name}**\n`

            }

        } else { badges = 'None' }

        const emb = new Discord.MessageEmbed()
            .setColor('#d000ff')
            .setTitle(`${rainbow} | Профиль`)
            .addFields(
                {name: 'User:', value: user.tag, inline: true},
                {name: 'Status:', value: status, inline: true},
                {name: 'Badges:', value: badges, inline: true}
            )
            .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
            .setTimestamp()
            .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
        await message.channel.send(emb)

    } catch(err){ Umeko.catchError( 'profile.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "profile"
};