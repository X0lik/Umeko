const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let wReplied = message.mentions.users.first();

    message.channel.bulkDelete(1);

    if (wReplied === undefined) return;

    if ( message.member.hasPermission( 'MANAGE_ROLES' ) ) {
        let reason = args.join(" ");

        const accept = new Discord.MessageEmbed()
            .setColor('#00ff95')
            .setTitle( `Спасибо за предложение, ${wReplied.username}!` )
            .setDescription( reason )
            .setTimestamp()
            .setFooter( message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
        message.channel.send(accept)

    }
};

module.exports.help = {
    name: "reply"
};