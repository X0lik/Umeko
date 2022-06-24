const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
const fs = require('fs')

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        try {

            let user = message.mentions.users.first()

            await message.channel.bulkDelete(1)
            let key = args[0]

            if ( !fs.existsSync( './data/keys/' + user.id ) ) { key = "None";  product = "Doesn't find any purchase"; }
            if ( Umeko.fileExists( './data/keys/' + user.id + '/' + key + '.txt' ) ){

                product = Umeko.readFile( './data/keys/' + user.id + '/' + key + '.txt' )

            }

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( 'Xoria | Development |  Check license' )
                .addField( 'Информация:', `Ник: **${user.tag}**\nПродукт: **${product}**\nЛицензия: **${key}**` )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

        } catch (err) { Umeko.catchError( 'checklicense.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "checklicense"
};