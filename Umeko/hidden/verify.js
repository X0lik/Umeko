const Discord = module.require("discord.js");
const roles = new Discord.Role();

module.exports.run = async (client, message) => {
    
    var server = message.guild;

    await message.channel.bulkDelete(1);
    console.log(`Пользователь ${message.author.username} верифицировался`);

    const embed = new Discord.MessageEmbed()
        .setTitle(`:heavy_check_mark: | Верификация:`)
        .setColor('#07f185')
        .setDescription(`**${message.author.username}** верифицировался `)
        .setImage( `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=64` )
    await message.channel.send(embed);

    if ( server.id === '883820186837331988' ) { 
        const role = message.member.guild.roles.cache.get( "883822964011843624" );
        await message.member.roles.add(role);
    } else if ( server.id === '895425443950379028' ) {
        const role = message.member.guild.roles.cache.get( "901219308003262505" );
        await message.member.roles.add(role);
    } else if ( server.id == '932884386125316106' ) {
        const role = message.member.guild.roles.cache.get( "932884386125316107" );
        await message.member.roles.add(role);
    }
};
module.exports.help = {
    name: "verify"
};