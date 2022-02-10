const Discord = module.require("discord.js");
const client = new Discord.Client()
let cfg = require( './cfg.json' );

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        try {

            message.channel.bulkDelete(1)

            let user = message.mentions.users.first();

            if (user.username === undefined){ Umeko.wrongArgs( 'Один из аргументов неправильный', message.channel ); return }

            user.mute = false

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Размут пользователя`)
                .addField(`${user.tag} был размучен`, `Выполнил: ${message.author.username}`)
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            message.channel.send(emb)

            Umeko.cmdLog( message.guild, message.author, 'unmute', args.join(' ') )

        } catch( err ){ Umeko.catchError( 'unmute.js', err, cfg.errlog )}

    }

};

module.exports.help = {
    name: "unmute"
};