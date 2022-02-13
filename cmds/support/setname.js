const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        let server = message.guild

        message.channel.bulkDelete(1)

        server.setName( args.join(' ') )

    }

};

module.exports.help = {
    name: "setname"
};