const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message,args) => {

    try {

        let user = message.mentions.users.first()
        let supportid = cfg.support.split(' ')

        if (user === null){ Umeko.wrongArgs( 'Нужно упомянуть игрока и ввести причину', message.channel); return }

        await message.channel.bulkDelete(1)

        if ( supportid.includes( message.author.id ) ) {

            Umeko.removeFile('./././data/blacklist/' + user.id + '.txt')
            Umeko.cmdLog( message.guild, message.author, 'rembl', args.join(' ') )

        }
        
    } catch(err){ Umeko.catchError( 'rembl.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "rembl"
};