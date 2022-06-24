const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    if ( message.author.id === cfg.root ) {

        try {

            let msg = args.join(" ");

            await message.channel.bulkDelete(1)

            const emb = new Discord.MessageEmbed()
                .setColor('#e6ca15')
                .setTitle( message.guild.name + ' | New Product' )
                .setDescription( msg )
                .setTimestamp()
                .setImage( 'https://i.ibb.co/096hh2L/xoria-script.png' )
                .setFooter(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
            await message.channel.send(emb)

        } catch (err) { Umeko.catchError( 'addprod.js', err, cfg.errlog ) }

    }

};

module.exports.help = {
    name: "addprod"
};