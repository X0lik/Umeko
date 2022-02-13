const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message) => {

    try {

        await message.channel.bulkDelete(1)
        const channel = client.channels.cache.find(channel => channel.id === '893044734006804515');

        channel.join()

        Umeko.cmdLog( message.guild, message.author, 'join', args.join(' ') )
    } catch (err){ Umeko.catchError( 'join.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "join"
};