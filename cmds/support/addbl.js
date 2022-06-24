const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    try {

        let user = message.mentions.users.first()
        let reason = args.slice(1).join(" ");
        let supportid = cfg.support.split(' ')

        if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

        if (user === null || reason === '' || reason === undefined || user.id === cfg.root ){ Umeko.wrongArgs( 'Нужно упомянуть игрока и ввести причину', message.channel); return }

        await message.channel.bulkDelete(1)

        if ( supportid.includes( message.author.id ) ) {

            Umeko.writeFile('./././data/blacklist/' + user.id + '.txt', reason)
            Umeko.cmdLog( message.guild, message.author, 'addbl', args.join(' ') )

        }

    } catch(err){ Umeko.catchError( 'addbl.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "addbl"
};