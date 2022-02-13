const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message) => {

    let rainbow = client.emojis.cache.get('941016254133698570');

    try {

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        const emb = new Discord.MessageEmbed()
            .setColor('#d000ff')
            .setTitle(`${rainbow} | Команды`)
            .setDescription( 'Префикс: **-**')
            .addFields(
                {name: 'Info:', value: 'profile\nsupport\nconfig\nreport', inline: true},
                {name: 'Mod:', value: 'ban\nkick\nmute\nunmute\nclear', inline: true},
                {name: 'Fun:', value: 'gay\nanswer', inline: true}
            )
            .setTimestamp()
            .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
        await message.channel.send(emb)

    } catch(err){ Umeko.catchError( 'help.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "help"
};