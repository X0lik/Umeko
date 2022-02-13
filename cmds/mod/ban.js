const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    let user = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    let rainbow = client.emojis.cache.get('941016254133698570');
    let mod_roles

    try {

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        if ( Umeko.fileExists( './././data/guilds/' + message.guild.id + '/mod_roles.txt' ) ){

            mod_roles = Umeko.readFile( './././data/guilds/' + message.guild.id + '/mod_roles.txt' ).split(' ')

        } else { Umeko.wrongArgs( 'У этого севера не настроен доступ! ( Команда: -config )', message.channel ); return }


        if ( message.author.id === cfg.root || message.member.roles.cache.map((role) => role.id).some( id => mod_roles.includes(id) ) ) {

            if (user === null || reason === '' ) { Umeko.wrongArgs( 'Нужно упомянуть игрока и ввести причину', message.channel); return }

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Блокировка пользователя`)
                .addField(`${user.username} был заблокирован`, `Причина: **${reason}**`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
                .setTimestamp()
                .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.cmdLog( message.guild, message.author, 'ban', args.join(' ') )
            Umeko.userLog( message.guild, user, message.author, 'Блокировка', `Вас заблокировали на ${message.guild}`, `Причина: **${reason}**\nАдминистратор: **${message.author.username}**` )
            await message.guild.members.ban( user.id, {reason: reason} )

        }

    } catch(err){ Umeko.catchError( 'ban.js', err, cfg.errlog ) }
}

module.exports.help = {
    name: "ban"
};