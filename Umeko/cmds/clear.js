const Discord = module.require("discord.js");
let cfg = require( './cfg.json' );

module.exports.run = async (client,message,args) => {

    if ( message.member.hasPermission('ADMINISTRATOR') ) {

        try {

            let count = args[0]

            console.log( parseInt(count) )

            if ( isNaN( parseInt(count) ) ){ Umeko.wrongArgs( 'Вы должны указать число, не превышающее 99', message.channel ); return }
            if ( parseInt( count ) >= 100 ){ count = 99; }

            await message.channel.bulkDelete(parseInt(count) + 1, true );

            const emb = new Discord.MessageEmbed()
                .setTitle(`:broom: | Очистка`)
                .setColor('#d000ff')
                .setDescription(`Удалено ${count} сообщений`)
                .setTimestamp()
                .setFooter(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.cmdLog( message.guild, message.author, 'clear', args.join(' ') )
            //Umeko.userLog( message.guild, message.author, message.author, 'Очистка', 'Очистка очка', 'Вам почистили очко' )

        } catch (err){ Umeko.catchError( 'clear.js', err, cfg.errlog ) }
    }

};
module.exports.help = {
    name: "clear"
};