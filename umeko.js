const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
let cfg = require( './cfg.json' );
client.commands = new Discord.Collection()

let cguild = ''
let status = ''

function leaveGuild( guild ){

}

client.on('guildCreate', guild => {

    if ( !fs.existsSync( 'data/guilds/' + guild.id ) ) {
        fs.mkdirSync( 'data/guilds/' + guild.id )
    }

    if ( Umeko.fileExists( './data/guilds/' + guild.id + '/blacklist.txt' ) ){ guild.leave(); return }

    cguild = guild;
    status = 'join';

})

client.on('guildDelete', guild => {

    if ( Umeko.fileExists( './data/guilds/' + guild.id + '/blacklist.txt' ) ){ return false }
    
    cguild = guild;
    status = 'leave';
    
})

fs.readdir('./cmds/fun', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} fun команд`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/fun/${f}`)
        client.commands.set(props.help.name, props)
    })
})

fs.readdir('./cmds/mod', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} mod команд`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/mod/${f}`)
        client.commands.set(props.help.name, props)
    })
})

fs.readdir('./cmds/info', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} info команд`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/info/${f}`)
        client.commands.set(props.help.name, props)
    })
})

fs.readdir('./cmds/support', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} support команд`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/support/${f}`)
        client.commands.set(props.help.name, props)
    })
})

fs.readdir('./cmds/config', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} config команд`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/config/${f}`)
        client.commands.set(props.help.name, props)
    })
})

fs.readdir('./cmds/reports', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} reports команд`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/reports/${f}`)
        client.commands.set(props.help.name, props)
    })
})

client.on('ready', () => {
    console.log(`Бот ${client.user.username} запустился`);
    client.user.setActivity('-help | UmekoSupport', { type: 'WATCHING' });
})

client.on('message', message => {
    let prefix = cfg.prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.split(' ')
    let command = messageArray[0]
    let args = messageArray.slice(1)

    let command_file = client.commands.get(command.slice(prefix.length))
    if (command_file) command_file.run(client, message, args, prefix)
})

client.on('message', message => {

    if (message.author.mute === true) {

        if ( message.author.mutedguild.includes( message.guild.id ) ){ message.delete() }

    }

})

const logs = client.channels.cache.find(channel => channel.id === cfg.guildlog );
let blush = client.emojis.cache.get('941016253869490226');
let love = client.emojis.cache.get('941016253852704788');
let members = cguild.memberCount

function checkGuilds() {

    if ( cguild != '' ){

        if ( status === 'join' ){

            const emb = new Discord.MessageEmbed()
                .setColor( '#05ea77' )
                .setTitle( `${love} | Добавление на сервер` )
                .addField( `Бот добавлен на новый сервер`, `Сервер: **${cguild.name}**\n\nВладелец: **${cguild.owner.user.username}**\nКоличество участников: **${members}**\n` )
                .setThumbnail( cguild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username + ' | Admin', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            logs.send( emb )

        } else {

            const emb = new Discord.MessageEmbed()
                .setColor( '#ff003b' )
                .setTitle( `${blush} | Удаление с сервера` )
                .addField( `Бот удален с сервера`, `Сервер: **${cguild.name}**\n\nВладелец: **${cguild.owner.user.username}**\nКоличество участников: **${members}**\n` )
                .setThumbnail( cguild.iconURL() )
                .setTimestamp()
                .setFooter( client.user.username + ' | Admin', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            logs.send( emb )

        }

        cguild = '';
        status = '';

    }

}

client.on('ready', () =>{
    client.generateInvite("ADMINISTRATOR").then(invite => console.log(`Ссылка на добавление ${invite}`))
    setInterval( checkGuilds, 1 );
})

client.login( cfg.token )

Umeko = {

    catchError: function( name, err, id ) {

        let logchannel = client.channels.cache.find(channel => channel.id === id )
        let rainbow = client.emojis.cache.get('941016254133698570');

        const emb = new Discord.MessageEmbed()
            .setColor( '#ff003b' )
            .setTitle( `${rainbow} | Critical Error` )
            .addField( `Ошибка в ${name}`, err )
            .setTimestamp()
            .setFooter( client.user.username + ' | Admin', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        logchannel.send( emb )

    },

    wrongArgs: function( msg, channel ) {

        let blush = client.emojis.cache.get('941016253869490226');

        const emb = new Discord.MessageEmbed()
            .setColor( '#ff003b' )
            .setTitle( `${blush} | Ошибка` )
            .addField( `Один из аргументов неправильный!`, msg )
            .setTimestamp()
            .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        channel.send( emb )

    },

    cmdLog: function( server, user, cmd, args ) {

        let log = client.channels.cache.find(channel => channel.id === cfg.cmdlog )

        const emb = new Discord.MessageEmbed()
            .setColor( '#d000ff' )
            .setTitle( `Использвана команда: ${cmd}` )
            .addField( `Сервер: **${server}**`, `Владелец: **${server.owner.user.username}**\nКоличество участников: **${server.memberCount}**\n\nПользователь: **${user.tag}**\nКоманда: **${cmd + ' ' + args}**` )
            .setAuthor( server, server.iconURL() )
            .setThumbnail( `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256` )
            .setTimestamp()
            .setFooter( client.user.username + ' | Admin', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        log.send( emb )

    },

    userLog: function( server, user, admin, title, description, msg ) {

        let alert = client.emojis.cache.get('941622064954109972');

        const emb = new Discord.MessageEmbed()
            .setColor( '#d000ff' )
            .setTitle( `${alert} | ${title}` )
            .addField( description, msg )
            .setThumbnail( server.iconURL() )
            .setTimestamp()
            .setFooter( admin.username, `https://cdn.discordapp.com/avatars/${admin.id}/${admin.avatar}.png?size=256` )
        user.send( emb )

    },

    readFile: function( path ) {
        return fs.readFileSync( path, 'utf8' )
    },

    writeFile: function( path, str ){
        fs.writeFileSync( path, str )
    },

    removeFile: function( path ){
        fs.unlinkSync( path )
    },

    fileExists: function( path ){
        return fs.existsSync( path )
    },

    userBL: function( user ){

        let server = client.guilds.cache.get('941012935218724934')
        let alert = client.emojis.cache.get('941622064954109972');

        const emb = new Discord.MessageEmbed()
            .setColor( '#d000ff' )
            .setTitle( `${alert} | Ошибка` )
            .addField( `Вы были внесены в чёрный список!`, `Причина: **${fs.readFileSync( '././data/blacklist/' + user.id + '.txt', 'utf8' )}**` )
            .setThumbnail( server.iconURL() )
            .setTimestamp()
            .setFooter( client.user.username + ' Support', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
        user.send( emb )

    }

}