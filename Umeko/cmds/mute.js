const Discord = module.require("discord.js");
const client = new Discord.Client()
let cfg = require( './cfg.json' );

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        try {

            await message.channel.bulkDelete(1)

            let user = message.mentions.users.first()
            let time = args[1]
            let reason = args.slice(2).join(" ")

            if (user === null || time === undefined || reason === undefined){ Umeko.wrongArgs( 'Нужно упомянуть игрока, ввести время и причину', message.channel ); return }

            user.mute = true

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Мут пользователя`)
                .addField(`${user.tag} был замучен\n`, `Время: **${time} секунд**\nПричина: **${reason}**\nВыполнил: **${message.author.username}**`)
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
            message.channel.send(emb)

            user.timeout = message.client.setTimeout(function () {

                user.mute = false

            }, parseInt(time * 1000) )

            Umeko.cmdLog( message.guild, message.author, 'mute', args.join(' ') )

        } catch( err ){ Umeko.catchError( 'mute.js', err, cfg.errlog )}

    }

};

module.exports.help = {
    name: "mute"
};