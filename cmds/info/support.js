const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message) => {

    try {

        let rainbow = client.emojis.cache.get('941016254133698570');

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        const emb = new Discord.MessageEmbed()
            .setColor('#d000ff')
            .setTitle(`${rainbow} | Umeko Support`)
            .addField( 'Our Discord:', 'https://discord.gg/TPf6qyuQNg' )
            .setTimestamp()
            .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
        await message.channel.send(emb)

    } catch(err){ Umeko.catchError( 'support.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "support"
};