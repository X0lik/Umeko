const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let wDenied = message.mentions.users.first();

    await message.channel.bulkDelete(1);

    if (wDenied === undefined) return;

    if ( message.member.hasPermission( 'MANAGE_ROLES' ) ) {
        let reason = args.join(" ");

        const deny = new Discord.MessageEmbed()
            .setColor('#dc143c')
            .setTitle( `${wDenied.username}, отказано!` )
            .setDescription( `**Причина:**\n${reason}` )
            .setTimestamp()
            .setFooter( message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` )
        await message.channel.send( deny ).catch(error => {
            console.error(
                error
            );
            message.author.send( "Кажется, пользователь запретил отправлять личные сообщения" );
        });

    }
};

module.exports.help = {
    name: "deny"
};