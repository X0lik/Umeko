const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    try {

        if ( message.author.id === cfg.root ) {

            let msg = args.join(" ");

            await message.channel.bulkDelete(1)
            await message.channel.send(msg);

            Umeko.cmdLog( message.guild, message.author, 'say', args.join(' ') )

        }

    } catch (err) { Umeko.catchError( 'say.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "say"
};