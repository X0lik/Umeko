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
            let time = args[1]
            let reason = args.slice(2).join(" ")

            if (user === null || isNaN( time ) || reason === '' ){ Umeko.wrongArgs( 'Нужно упомянуть игрока, ввести время и причину', message.channel ); return }

            user.mute = true

            if ( user.mutedguild === undefined ){
                user.mutedguild = []
                user.mutedguild.push( message.guild.id )
            } else {
                user.mutedguild.push( message.guild.id )
            }

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Мут пользователя`)
                .addField(`${user.tag} был замучен\n`, `Время: **${time} секунд**\nПричина: **${reason}**\nАдминистратор: **${message.author.username}**`)
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

            user.timeout = message.client.setTimeout(function () {

                if ( user.mutedguild.length > 1 ) {
                    user.mutedguild = user.mutedguild.filter(e => e !== message.guild.id)
                } else {
                    user.mutedguild = user.mutedguild.filter(e => e !== message.guild.id)
                    user.mute = false
                }


            }, parseInt(time * 1000) )

            Umeko.cmdLog( message.guild, message.author, 'mute', args.join(' ') )
            Umeko.userLog( message.guild, user, message.author, 'Мут', `Вас замутили на ${message.guild}`, `Время: **${time} секунд**\nПричина: **${reason}**\nАдминистратор: **${message.author.username}**` )

        }

    } catch( err ){ Umeko.catchError( 'mute.js', err, cfg.errlog )}

};

module.exports.help = {
    name: "mute"
};