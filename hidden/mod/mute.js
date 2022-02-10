const Discord = module.require("discord.js");

module.exports.run = async (client,message) => {

    let author = message.author;
    let messageArray = message.content.split(' ')
    let time = messageArray[2]
    let sms = messageArray.slice(3)
    let reason = sms.join(" ");
    const user = message.mentions.users.first();

    if ( !message.channel.bulkDelete(1) ) return;

    let allowedUsers = [ '717428426302291999', '681422382266974239', '718113377842626580', '766710197615198270', '341943914032398336' ]

    if ( allowedUsers.includes( author.id ) ) {

       if ( user === undefined || time === undefined || reason === undefined ) {

            const err = new Discord.MessageEmbed()
                .setColor( '#ff0073' )
                .setTitle( `:x: | Ошибка` )
                .addField( `Не задан один из параметров!`, `Перепроверьте аргументы!` )
                .setTimestamp()
                .setFooter( 'Axion | Error', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            await message.channel.send( err )

            return;
        }

        const muted = new Discord.MessageEmbed()
            .setColor( '#00a2ff' )
            .setTitle( `:no_entry_sign: | Мут пользователя` )
            .addField( `${user.username} был замучен`, `Время: **${time} секунд**\nПричина: **${reason}**` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=256` )
        message.channel.send( muted )

        const mutedr = new Discord.MessageEmbed()
            .setColor( '#00a2ff' )
            .setTitle( `Доброго времени суток, ${user.username}!` )
            .addField( `Вы были замучены администратором ${author.tag}!`, `Время: **${time} секунд**\nПричина: **${reason}**` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        user.send( mutedr ).catch(error => {
            console.error(
                error
            );
            message.author.send( "Кажется, пользователь запретил отправлять личные сообщения" );
        });

        const muser = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.id == '924001071616114688' )
        await muser.roles.add( role )


        muser.timeout = message.client.setTimeout( function(){

            muser.roles.remove( role )

        }, parseInt( time * 1000 ) );

    }
};

module.exports.help = {
    name: "mute"
};