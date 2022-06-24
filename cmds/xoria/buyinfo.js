const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    if ( message.channel.type === 'dm') {

        try {

            if ( Umeko.fileExists( './data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( 'Xoria | Development | Buy Product' )
                .addFields(
                    { name: '__**Как купить продукт?**__', value: 'Сначала нужно оплатить продукт, после написать команду "-buy" и следующую информацию: продукт ( например: xpromocode ), точную дату и время оплаты, 4 последние цифры карты, с которой производилась оплата, полное имя ( фамилию, имя и отчество ) и сумму.\nПример: **-buy xpromocode, 04.05.2022 23:22, 5487, Иванов Иван И, 25р**\n\nНомер карты: **4377 7278 1393 7476**.' },
                    { name: '__**How to buy a product?**__', value: 'First you need to pay for the product, then write the "-buy" command and the following information: the product ( example: xpromocode ), the exact date and time of payment, the last 4 digits of the card with which the payment was made or the full name ( last name, first name and patronymic ) and the amount .\nExample: **-buy xpromocode, 04.05.2022 23:22, 5487, Ivanov Ivan I, 0,4$**\n\nCard number: **4377 7278 1393 7476**' } )
                //.setThumbnail( message.guild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

        } catch (err) { Umeko.catchError( 'buyinfo.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "buyinfo"
};