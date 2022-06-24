const cfg = JSON.parse( Umeko.readFile('cmds/cfg.json') )

module.exports.run = async (client,message) => {

    try{

        let supportid = cfg.support.split(' ')

        if ( supportid.includes( message.author.id ) ) {

            if ( Umeko.fileExists( './././data/blacklist/' + message.author.id + '.txt' ) ){ Umeko.userBL( message.author ); return }

            let server = message.guild

            await message.channel.bulkDelete(1)

            await server.leave()

            Umeko.cmdLog( message.guild, message.author, 'leave', args.join(' ') )

        }

    } catch (err){ Umeko.catchError( 'leave.js', err, cfg.errlog ) }

};

module.exports.help = {
    name: "leave"
};