const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let wAccepted = message.mentions.users.first();
    let wAdmin = message.author.username;

    message.channel.bulkDelete(1);

    if (wAccepted === undefined ) return;

    if ( message.member.hasPermission( 'MANAGE_ROLES' ) ) {

        const accept = new Discord.MessageEmbed()
            .setColor('#00ff95')
            .setTitle( `${wAccepted.username}, принято!` )
            .setDescription( 'Администрация свяжется с Вами в скором времени!' )
            .setTimestamp()
            .setFooter( message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
        message.channel.send(accept)

        const acceptr = new Discord.MessageEmbed()
        .setColor( '#00ff95' )
        .setTitle( `Доброго времени суток, ${wAccepted.username}!` )
        .addField( `**Ваша заявка была одобрена администратором ${wAdmin}!**`, 'Спасибо, за участие в жизни нашего проекта!' )
        .setTimestamp()
        .setFooter( 'Axion | AutoMessage', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        wAccepted.send( acceptr ).catch(error => {
            console.error(
                error
            );
            message.author.send( "Кажется, пользователь запретил отправлять личные сообщения" );
        });

    }
};

module.exports.help = {
    name: "accept"
};