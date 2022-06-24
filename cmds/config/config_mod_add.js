const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
let rdata

module.exports.run = async (client,message,args) => {

    try {

        let rainbow = client.emojis.cache.get('941016254133698570');
        let role = message.mentions.roles.first()

        await message.channel.bulkDelete(1)

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        if ( message.guild.owner.id === message.author.id || message.author.id === cfg.root ) {

            if (Umeko.fileExists('./././data/guilds/' + message.guild.id + '/mod_roles.txt')) {

                rdata = Umeko.readFile('./././data/guilds/' + message.guild.id + '/mod_roles.txt')

                if (rdata.split(' ').includes(role.id)) {
                    Umeko.wrongArgs('Эта роль уже добавлена!', message.channel);
                    return
                } else {
                    rdata += role.id + ' '
                }

                Umeko.writeFile('./././data/guilds/' + message.guild.id + '/mod_roles.txt', rdata)

            } else {
                Umeko.writeFile('./././data/guilds/' + message.guild.id + '/mod_roles.txt', role.id + ' ')
            }

            const emb = new Discord.MessageEmbed()
                .setTitle(`${rainbow} | Модерация`)
                .setColor('#d000ff')
                .addField(`Доступ к командам:`, `Добавлен: ${role}`)
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
                .setFooter(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256`)
            await message.channel.send(emb);

        }


    } catch( err ){ Umeko.catchError( 'config_mod_add.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "config_mod_add"
};