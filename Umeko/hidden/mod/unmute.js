const Discord = module.require("discord.js");

module.exports.run = async (client,message) => {

    let author = message.author;
    let messageArray = message.content.split(' ')
    let sms = messageArray.slice(2)
    let reason = sms.join(" ");
    const user = message.mentions.users.first();

    if ( !message.channel.bulkDelete(1) ) return;

    let allowedUsers = [ '717428426302291999', '681422382266974239', '718113377842626580', '766710197615198270', '341943914032398336' ];

    if ( allowedUsers[ message.author.id ] ) {

        if ( user === undefined || reason === undefined ) {

            const err = new Discord.MessageEmbed()
                .setColor( '#ff0073' )
                .setTitle( `:x: | Ошибка` )
                .addField( `Не задан один из параметров!`, `Перепроверьте аргументы!` )
                .setTimestamp()
                .setFooter( 'Axion | Error', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            await message.channel.send( err )

            return;
        }

        const unmuted = new Discord.MessageEmbed()
            .setColor( '#00a2ff' )
            .setTitle( `:white_check_mark: | Размут пользователя` )
            .addField( `${user.username} был размучен`, `Причина: **${reason}**` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=256` )
        await message.channel.send( unmuted )

        const unmutedr = new Discord.MessageEmbed()
            .setColor( '#00a2ff' )
            .setTitle( `Доброго времени суток, ${user.username}!` )
            .addField( `Вы были размучены администратором ${author.tag}!`, `Причина: **${reason}**\n\nНе нарушайте правила, иначе снова можете получить блокировку чата!` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        if ( !user.send( unmutedr ) ) return;

        const muser = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.id == '924001071616114688' )
        await muser.roles.remove( role )


    }
};

module.exports.help = {
    name: "unmute"
};