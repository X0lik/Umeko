const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let wBlocked = message.mentions.users.first();
    let wAdmin = message.author.username;
    let messageArray = message.content.split(' ')
    let sms = messageArray.slice(2)
    let reason = sms.join(" ");

    if ( !message.channel.bulkDelete(1) ) return;

    let allowedUsers = [ '717428426302291999', '681422382266974239', '718113377842626580' ]

    if ( allowedUsers.includes( message.author.id ) ) {

        if ( wBlocked === undefined || reason === undefined ) {
            const err = new Discord.MessageEmbed()
                .setColor( '#ff0073' )
                .setTitle( `:x: | Ошибка` )
                .addField( `Не задан один из параметров!`, `Перепроверьте аргументы!` )
                .setTimestamp()
                .setFooter( 'Axion | Error', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            message.channel.send( err )

            return;
        }

        const blocked = new Discord.MessageEmbed()
            .setColor( '#00a2ff' )
            .setTitle( `:no_entry_sign: | Блокировка пользователя` )
            .addField( `${wBlocked.username} был заблокирован\n`, `Причина: **${reason}**` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
        message.channel.send( blocked )

        const blockedr = new Discord.MessageEmbed()
            .setColor( '#00a2ff' )
            .setTitle( `Доброго времени суток, ${wBlocked.username}!` )
            .addField( `Вы были заблокированы администратором ${wAdmin.tag}!\n`, `Причина: **${reason}**` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        wBlocked.send( blockedr ).catch(error => {
            console.error(
                error
            );
            message.author.send( "Кажется, пользователь запретил отправлять личные сообщения" );
        });

        message.guild.members.ban( `${wBlocked.id}`, { reason: `${reason}` } )
    
    }
};

module.exports.help = {
    name: "ban"
};