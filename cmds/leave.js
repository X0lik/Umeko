let cfg = require( './cfg.json' );

module.exports.run = async (client,message) => {

    if ( message.author.id === cfg.root ) {

        let server = message.guild

        await message.channel.bulkDelete(1)

        await server.leave()

    }

};

module.exports.help = {
    name: "leave"
};