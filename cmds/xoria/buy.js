const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    if ( message.channel.type === 'dm') {

        try {

            if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

            let msg = args.join(" ");
            let log = client.channels.cache.find(channel => channel.id === cfg.paylog )

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( 'Xoria | Development | Buy Product' )
                .addField( 'Спасибо за покупку!', 'После проверки платежа администрация отправит Вам купленный продукт с уникальным ключом - лицензией.\n\nЭту лицензию Вы должны сохранить - в будущем она поможет получить замену продукта, помощь в его использовании или обновление.'  )
                //.setThumbnail( message.guild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

            const payemb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( 'Xoria | Development | Buy Product' )
                .addField( 'Проверка покупки продукта', `**Ник:** ${message.author}\n**Информация:**` + '```' + msg + '```' )
                //.setThumbnail( message.guild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await log.send(payemb)

        } catch (err) { Umeko.catchError( 'buy.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "buy"
};