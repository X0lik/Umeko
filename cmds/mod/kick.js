const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
let mod_roles

module.exports.run = async (client,message,args) => {

    try {

        if ( Umeko.fileExists( './././data/guilds/' + message.guild.id + '/mod_roles.txt' ) ){

            mod_roles = Umeko.readFile( './././data/guilds/' + message.guild.id + '/mod_roles.txt' ).split(' ')

        } else { Umeko.wrongArgs( 'У этого севера не настроен доступ! ( Команда: -config )', message.channel ); return }


        if ( message.author.id === cfg.root || message.member.roles.cache.map((role) => role.id).some( id => mod_roles.includes(id) ) ) {

            if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

            await message.channel.bulkDelete(1)

            let user = message.mentions.users.first()
            let reason = args.slice(1).join(' ')

            if (user === null || reason === undefined || reason === null){ Umeko.wrongArgs( 'Нужно упомянуть игрока и ввести причину', message.channel ); return }

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Кик пользователя`)
                .addField(`${user.tag} был кикнут\n`, `Причина: **${reason}**\nАдминистратор: **${message.author.username}**` )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.userLog( message.guild, user, message.author, 'Исключение', `Вас кикнули с ${message.guild}`, `Причина: **${reason}**\nАдминистратор: **${message.author.username}**` )

            await message.guild.members.cache.get(user.id).kick()

            Umeko.cmdLog( message.guild, message.author, 'kick', args.join(' ') )

        }

    } catch( err ){ Umeko.catchError( 'kick.js', err, cfg.errlog )}

};

module.exports.help = {
    name: "kick"
};