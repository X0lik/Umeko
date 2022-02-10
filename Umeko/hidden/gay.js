const Discord = module.require("discord.js");

module.exports.run = async (client,message,args) => {

    let rMember = message.mentions.members.first()

    const embed = new Discord.MessageEmbed()
        .setTitle( `Я думаю что`)
        .setColor( '#7400ff' )
        .setDescription ( `**${rMember}** гей на: ${ Math.floor(Math.random() * 100 ) }%`)
        .setTimestamp()
        .setFooter(`${message.author.username}` )
    message.channel.send( embed );

};
module.exports.help = {
    name: "gay"
};