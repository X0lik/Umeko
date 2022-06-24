const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    try {

        let reason = args.slice(1).join(' ');
        let supportid = cfg.support.split(' ')

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        if (reason === '' || reason === undefined || message.guild.id === '941012935218724934' ){ Umeko.wrongArgs( 'Нужно ввести причину', message.channel ); return }

        await message.channel.bulkDelete(1)

        if ( supportid.includes( message.author.id ) ) {

            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle(`${rainbow} | Сервер заблокирован!`)
                .addField(`Сервер был добавлен в черный список`, `Причина: **${reason}**\nАдминистратор: **${message.author.username}**` )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.writeFile('./././data/guilds/' + message.guild.id + '/blacklist.txt', reason)
            Umeko.cmdLog( message.guild, message.author, 'addsbl', args.join(' ') )

            message.guild.leave()

        }
    } catch(err){ Umeko.catchError( 'addsbl.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "addsbl"
};