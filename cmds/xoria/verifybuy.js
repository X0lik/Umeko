const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
const fs = require('fs')

let keygen = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
               'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
               '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]

const { MessageAttachment } = require('discord.js');
const xpromocode = new MessageAttachment( './files/[xoriadev] xpromocode.rar' );

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        try {

            let user = message.mentions.users.first()
            let product = args[0]

            await message.channel.bulkDelete(1)
            let key = 'xoriadev-'

            for ( let i = 0; i < 32; i++) {
                key += keygen[ Math.floor(Math.random() * keygen.length) ]
            }

            if ( !fs.existsSync( './data/keys/' + user.id ) ) { fs.mkdirSync( './data/keys/' + user.id ) }
            Umeko.writeFile('./data/keys/' + user.id + '/' + key + '.txt', product )

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( 'Xoria | Development' )
                .addFields(
                    { name: 'Успешно!', value: `Вашу покупку подтвердила администрация. Спасибо за покупку **${product}**\n\n**Лицензия:** __${key}__` },
                    { name: 'Success!', value: `Your purchase has been confirmed by the administration. Thanks for buying **${product}**\n\n**License:** __${key}__` } )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await user.send(emb)

            switch (product)
            {
                case "XPromocode":
                    await user.send( xpromocode );

                default:
                    return false;
            }

            const iemb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( 'Xoria | Development | Product Verify' )
                .addField( 'Успешно!', `Ник: **${user.tag}**\nПродукт: **${product}**\nЛицензия: **${key}**` )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(iemb)

        } catch (err) { Umeko.catchError( 'verifybuy.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "verifybuy"
};