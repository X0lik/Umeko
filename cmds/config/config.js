const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message) => {

    try {

        let rainbow = client.emojis.cache.get('941016254133698570');

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        const emb = new Discord.MessageEmbed()
                .setTitle(`${rainbow} | Настройки`)
                .setColor('#d000ff')
                .setDescription( '**Эти команды доступны только владельцу сервера**' )
                .addField( `Команды для настройки:`, `config_mod_add @role - Добавить роль как модератора\nconfig_mod_remove @role - Удалить роль как модератора`)
                .setThumbnail( message.guild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
        await message.channel.send(emb);


    } catch( err ){ Umeko.catchError( 'config.js', err, cfg.errlog ) }

};
module.exports.help = {
    name: "config"
};