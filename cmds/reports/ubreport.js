const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    let rainbow = client.emojis.cache.get('941016254133698570');
    let supportid = cfg.support.split(' ')

    try {

        if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        let reportid = args[0]

        if ( reportid === undefined || !Umeko.fileExists( './data/reports/' + reportid + '.txt' ) ){ Umeko.wrongArgs( 'Нужно ввести ID жалобы', message.channel ); return }

        if ( supportid.includes( message.author.id ) ) {

            let user = client.users.cache.find(user => user.id === Umeko.readFile('./data/reports/' + reportid + '.txt'))

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Жалобы`)
                .addField('Разблокировка доступа к жалобам', `**Пользователь:** ${user}\n**ID:** ${user.id}`)
                .setTimestamp()
                .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.removeFile('./data/blacklist/' + user.id + '_reports.txt')
            Umeko.userLog(message.guild, user, message.author, 'Жалобы', `Вам раблокировали доступ к жалобам`, `**Администратор:** ${message.author}`)
            Umeko.cmdLog( message.guild, message.author, 'ubreport', args.join(' ') )

        }

    } catch(err){ Umeko.catchError( 'ubreport.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "ubreport"
};