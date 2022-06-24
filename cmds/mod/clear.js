const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )
let mod_roles

module.exports.run = async (client,message,args) => {

    try {

        if ( Umeko.fileExists( './././data/guilds/' + message.guild.id + '/mod_roles.txt' ) ){

            mod_roles = Umeko.readFile( './././data/guilds/' + message.guild.id + '/mod_roles.txt' ).split(' ')

        } else { Umeko.wrongArgs( 'У этого севера не настроен доступ! ( Команда: -config )', message.channel ); return }


        if ( message.author.id === cfg.root || message.member.roles.cache.map((role) => role.id).some( id => mod_roles.includes(id) ) ) {

            if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

            let count = args[0]

            if ( isNaN( parseInt(count) ) ){ Umeko.wrongArgs( 'Вы должны указать число, не превышающее 99', message.channel ); return }
            if ( parseInt( count ) >= 100 ){ count = 99; }

            await message.channel.bulkDelete(parseInt(count) + 1, true );

            const emb = new Discord.MessageEmbed()
                .setTitle(`:broom: | Очистка`)
                .setColor('#d000ff')
                .setDescription(`Удалено ${count} сообщений`)
                .setTimestamp()
                .setFooter(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
            await message.channel.send(emb)

            Umeko.cmdLog( message.guild, message.author, 'clear', args.join(' ') )

            function clearLast() { message.channel.bulkDelete(1) }

            setTimeout( clearLast, 1300 )
        }

    } catch (err){ Umeko.catchError( 'clear.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "clear"
};