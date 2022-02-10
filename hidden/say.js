const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let msg = args.join(" ");
    let cmd = '717428426302291999'

    if ( !message.channel.bulkDelete(1) ) return;

    if ( message.author.id === cmd ) {
        message.channel.send( msg );
    }

};
module.exports.help = {
    name: "say"
};