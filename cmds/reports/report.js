const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
global.reports = []
let reportid = parseInt( Umeko.readFile( './data/reports/report_count.txt' ) ) + 1

module.exports.run = async (client,message,args) => {

    try {

        let report = client.channels.cache.find(channel => channel.id === cfg.reports )
        let rainbow = client.emojis.cache.get('941016254133698570');

        if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }
        if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '_reports.txt' ) ){ Umeko.userLog( message.guild, message.author, client.user, 'Жалобы', `Вам заблокировали доступ к жалобам!`, `**Причина**: ${ Umeko.readFile('./data/blacklist/' + message.author.id + '_reports.txt') }` ); return }

        await message.channel.bulkDelete(1)

        Umeko.writeFile( './data/reports/' + reportid + '.txt', message.author.id )

        const emb = new Discord.MessageEmbed()
            .setColor('#d000ff')
            .setTitle(`${rainbow} | Жалоба`)
            .addField( 'Жалоба успешно отправлена', 'Наша модерация постарается разобрать Вашу жалобу как можно раньше!' )
            .setTimestamp()
            .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
        await message.channel.send(emb)

        const embl = new Discord.MessageEmbed()
            .setColor('#d000ff')
            .setTitle(`${rainbow} | Новая жалоба`)
            .addField( `Пользователь: ${message.author.tag}`, `**ID:** ${reportid}\n**Причина:** ${args.join(' ')}` )
            .setThumbnail( `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
            .setTimestamp()
            .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
        await report.send(embl)

        Umeko.writeFile( './data/reports/report_count.txt', reportid.toString() )

        reportid += 1

    } catch(err){ Umeko.catchError( 'report.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "report"
};