const Discord = module.require("discord.js");
let cfg = require( './cfg.json' );

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        let msg = args.join(" ");

        try {
            await message.channel.bulkDelete(1)

            await message.channel.send(msg);

            Umeko.cmdLog( message.guild, message.author, 'say', args.join(' ') )
        } catch (err) { Umeko.catchError( 'say.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "say"
};