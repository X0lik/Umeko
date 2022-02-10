const Discord = module.require("discord.js");

module.exports.run = async (client,message) => {

    let commands = [ "```verify, gay, clear, accept, decline, say```" ];
    let creators = [ "Code - **X0lik#2127**\n Date: **30.09.2021** at **22:56** " ];

    message.channel.bulkDelete(1);

    const embed = new Discord.MessageEmbed()
        .setTitle( 'Информация' )
        .setColor( '#7400ff' )
        .setDescription ( `\n**Команды:**\n${commands}\n**Префикс:**\n**-**\n\n**Создатель:**\n\n${creators}`  )
    message.channel.send( embed );

};

module.exports.help = {
    name: "help"
};