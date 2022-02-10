const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let msg = args.join(" ");
    let cmd = message.author;
    const channel = client.channels.cache.find(channel => channel.id === '925877069164990484' );

    if ( !message.channel.bulkDelete(1) ) return;

    if ( cmd.id === '717428426302291999' ) {

        const asay = new Discord.MessageEmbed()
            .setColor( '#e3c714' )
            .setTitle( `:pushpin: | Оповещение для администрации` )
            .addField( `Сообщение от ${cmd.tag}`, msg )
            .setTimestamp()
            .setFooter( 'Axion | AMessage', `https://cdn.discordapp.com/avatars/${cmd.id}/${cmd.avatar}.png?size=256` )
        channel.send( asay )

    };

};

module.exports.help = {
    name: "asay"
};