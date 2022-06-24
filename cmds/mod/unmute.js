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

            message.channel.bulkDelete(1)

            let user = message.mentions.users.first();

            if (user.username === undefined){ Umeko.wrongArgs( 'Один из аргументов неправильный', message.channel ); return }

            user.mute = false

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Размут пользователя`)
                .addField(`${user.tag} был размучен`, `Администратор: **${message.author.username}**`)
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            message.channel.send(emb)

            Umeko.cmdLog( message.guild, message.author, 'unmute', args.join(' ') )
            Umeko.userLog( message.guild, user, message.author, 'Размут', `Вас размутили на ${message.guild}`, `Администратор: **${message.author.username}**` )

        }

    } catch( err ){ Umeko.catchError( 'unmute.js', err, cfg.errlog )}

};

module.exports.help = {
    name: "unmute"
};