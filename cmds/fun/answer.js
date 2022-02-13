const Discord = module.require("discord.js");
const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    try {

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        await message.channel.bulkDelete(1)

        let rand = Math.floor(Math.random() * 10)
        if ( rand < 5 ){ rand = 'Да :ok_hand:' } else if ( rand > 5 ){ rand = 'Нет :x:' } else { rand = 'Возможно :thinking:' }

        const emb = new Discord.MessageEmbed()
                .setTitle(`:grey_question: | ${args.join(' ')}`)
                .setDescription( `${rand}` )
                .setColor('#d000ff')
                .setTimestamp()
                .setFooter(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
        await message.reply(emb);

    } catch( err ){ Umeko.catchError( 'answer.js', err, cfg.errlog ) }

};
module.exports.help = {
    name: "answer"
};