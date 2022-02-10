const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let server = message.guild;
    let messageArray = message.content.split(' ')
    let version = messageArray[1]
    let msg = messageArray.slice(2).join(" ");
    let cmd = message.author;

    if ( !message.channel.bulkDelete(1) ) return;

    if ( cmd.id === '717428426302291999' ) {

        const asay = new Discord.MessageEmbed()
            .setColor( '#5e5e5e' )
            .setTitle( `:orange_book: | DevBlog` )
            .addField( version, msg )
            .setTimestamp()
            .setFooter( 'Axion | DevBlog', `https://cdn.discordapp.com/avatars/${cmd.id}/${cmd.avatar}.png?size=256` )

        if ( server.id === '895425443950379028' ) { 
            const channel = client.channels.cache.find(channel => channel.id === '925803171132080178' );
            channel.send( asay )
        } else if ( server.id == '932884386125316106' ) {
            const channel = client.channels.cache.find(channel => channel.id === '932909914106503229' );
            channel.send( asay )
        }

    };

};

module.exports.help = {
    name: "devblog"
};