const fs = require("fs");
const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let cmd = message.author
    let runstring = args.join(' ');

    if ( !message.channel.bulkDelete(1) ) return;

    if ( cmd.id === '717428426302291999' ) {

        const rsembed = new Discord.MessageEmbed()
            .setColor('#00ff95')
            .setTitle( `:computer: Axion | Console` )
            .addField( 'Выполнение команды от консоли', `Команда: **${runstring}**` )
            .setTimestamp()
            .setFooter( 'Axion | Security', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        message.channel.send( rsembed )

        fs.writeFile('c:/Users/Nikita/Desktop/SWRP/steamapps/common/GarrysModDS/garrysmod/data/axion.discord/cmd.txt', runstring, function(){} );

    }
};

module.exports.help = {
    name: "cmd"
};