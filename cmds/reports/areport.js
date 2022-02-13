const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    let rainbow = client.emojis.cache.get('941016254133698570');
    let supportid = cfg.support.split(' ')
    let adminid = cfg.admin.split(' ')

    try {

        if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        let reportid = args[0]

        if ( reportid === undefined || !Umeko.fileExists( './data/reports/' + reportid + '.txt' ) || args.slice(1).join(' ') === '' || args.slice(1).join(' ') === undefined ){ Umeko.wrongArgs( 'Нужно ввести ID жалобы и ответ', message.channel ); return }

        if ( supportid.includes( message.author.id ) || adminid.includes( message.author.id ) ) {

            let user = client.users.cache.find(user => user.id === Umeko.readFile('./data/reports/' + reportid + '.txt'))

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Жалоба`)
                .addField('Ответ успешно отправлен', `**ID:** ${reportid}\n**Ответ:** ${args.slice(1).join(' ')}`)
                .setTimestamp()
                .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.userLog(message.guild, user, message.author, 'Жалобы', `Пришел ответ на Вашу жалобу!`, `**Администратор:** ${message.author}\n\n**ID:** ${reportid}\n**Ответ**: ${args.slice(1).join(' ')}`)

            Umeko.removeFile('./data/reports/' + reportid + '.txt')

        }

    } catch(err){ Umeko.catchError( 'areport.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "areport"
};