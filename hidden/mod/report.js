const Discord = module.require("discord.js");
let rep_num = 0

module.exports.run = async (client,message,args) => {

    let server = message.guild;
    let user = message.author
    let rep = args.join(" ");
    let x0lik = await client.users.fetch( '717428426302291999' );
    rep_num += 1

    if ( message.guild != null ){ message.channel.bulkDelete(1); }

    if ( user === undefined || !user ) return;

    if ( rep.length < 5 ) {

        const err = new Discord.MessageEmbed()
        .setColor( '#ff0073' )
        .setTitle( `:x: | Ошибка` )
        .setDescription( `Содержание вашего тикета слишком маленькое.\nПожалуйста, распишите свою проблему подробнее` )
        .setTimestamp()
        .setFooter( 'Axion | Errors', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        message.channel.send( err )

        return;
    };

        const emb = new Discord.MessageEmbed()
            .setColor('#00ff95')
            .setTitle( `:clipboard: | Тикет отправлен!` )
            .addField( `Спасибо за обращение, ${user.username}`, `Номер тикета: ${rep_num}\nАдминистрация постарается разобрать его как можно раньше` )
            .setTimestamp()
            .setFooter( 'Axion | AutoMessage', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        message.channel.send( emb )

        const embl = new Discord.MessageEmbed()
        .setColor( '#00a2ff' )
        .setTitle( `:clipboard: Reports | Новый тикет` )
        .addField( `\nНомер тикета: ${rep_num}` , `Ник: ${user.username}\nID: ${user.id}\n\n${rep}\n` )
        .setTimestamp()
        .setFooter( 'Axion | Reports', `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256` )
        x0lik.send( embl )
        x0lik.send( user.id )

};

module.exports.help = {
    name: "rep"
};