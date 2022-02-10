const Discord = module.require("discord.js");
let rep_num = 0

module.exports.run = async (client,message,args) => {

    let messageArray = message.content.split(' ')
    let rep_num = messageArray[1]
    let user = await client.users.fetch( messageArray[2] );
    let rep = messageArray.slice(3).join(" ");
    let x0lik = await client.users.fetch( '717428426302291999' );
    let jojo = await client.users.fetch( '681422382266974239' );
    let krya = await client.users.fetch( '718113377842626580' );

    if ( !message.guild === null ){ message.channel.bulkDelete(1) }

    if ( message.author === x0lik || message.author == krya || message.author === jojo ) {

        const emb = new Discord.MessageEmbed()
            .setColor('#00a2ff')
            .setTitle( `:clipboard: Reports | Ответ на тикет` )
            .addField( `Данные: `, `Ник: **${user.username}**\nID: **${user.id}**\nНомер тикета: **${rep_num}**\n\nОтвет: **${rep}**` )
            .setTimestamp()
            .setFooter( 'Axion | Reports', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        message.channel.send( emb )

        const embl = new Discord.MessageEmbed()
        .setColor( '#00a2ff' )
        .setTitle( `:clipboard: Reports | Ответ на тикет` )
        .addField( `Данные: `, `**Ник:** ${message.author.username}\n**Номер тикета:** ${rep_num}\n\n**Ответ: **${rep}\n\nЕсли у вас ещё остались вопросы, вы можете ещё раз создать тикет` )
        .setTimestamp()
        .setFooter( 'Axion | Reports', `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
        user.send( embl ).catch(error => {
            console.error(
                error
            );
            message.reply( "Кажется, пользователь запретил отправлять личные сообщения" );
        });

    };

};

module.exports.help = {
    name: "crep"
};