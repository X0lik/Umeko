const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message) => {

    try {

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        let user = message.mentions.members.first()

        if ( user === undefined ) { Umeko.wrongArgs( 'Вам нужно упомянуть пользователя!', message.channel ) } else {

                const emb = new Discord.MessageEmbed()
                    .setTitle(`:rainbow_flag: | Калькулятор геев`)
                    .setColor('#d000ff')
                    .setDescription(`${user.user.username} гей на **${Math.floor(Math.random() * 100)}%**`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png?size=256`)
                    .setTimestamp()
                    .setFooter(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
                await message.channel.send(emb);

        }

    } catch( err ){ Umeko.catchError( 'gay.js', err, cfg.errlog ) }

};
module.exports.help = {
    name: "gay"
};