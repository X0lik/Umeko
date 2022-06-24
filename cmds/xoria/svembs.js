const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        try {

            let msg = args.join(" ");

            await message.channel.bulkDelete(1)

            const emb = new Discord.MessageEmbed()
                .setColor('#d000ff')
                .setTitle( message.guild.name )
                .setDescription( msg )
                .setThumbnail( message.guild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb)

        } catch (err) { Umeko.catchError( 'svembs.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "svembs"
};