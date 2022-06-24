const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    try {

        let server = args[0]
        let reason = args.slice(1).join(' ');
        let supportid = cfg.support.split(' ')

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        if ( reason === '' || reason === undefined ){ Umeko.wrongArgs( 'Нужно ввести причину', message.channel ); return }

        await message.channel.bulkDelete(1)

        if ( supportid.includes( message.author.id ) ) {

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Сервер разблокирован!`)
                .addField(`Сервер был удален из черного списка`, `Администратор: **${message.author.username}**` )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.removeFile('./././data/guilds/' + server + '/blacklist.txt' )
            Umeko.cmdLog( message.guild, message.author, 'remsbl', args.join(' ') )

        }
    } catch(err){ Umeko.catchError( 'remsbl.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "remsbl"
};