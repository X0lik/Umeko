const Discord = module.require("discord.js");
let count

module.exports.run = async (client,message,args) => {

    count = args.join(" ");

    if ( message.member.hasPermission('ADMINISTRATOR') ){

        message.channel.bulkDelete( parseInt(count) + 1 );

        const admin = new Discord.MessageEmbed()
            .setTitle(`:broom: | Очистка`)
            .setColor('#7400ff')
            .setDescription( `Очищено сообщений: ${count}` )
            .setTimestamp()
            .setFooter( message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
        message.channel.send(admin)


    } else {
        message.channel.bulkDelete(1);
    }

};
module.exports.help = {
    name: "clear"
};