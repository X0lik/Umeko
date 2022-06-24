const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
let cfg = require( './cfg.json' );
const {Role} = require("discord.js");
client.commands = new Discord.Collection()

let cguild = ''
let status = ''

client.on('guildCreate', guild => {

    try{

        if ( !fs.existsSync( 'data/guilds/' + guild.id ) ) {
            fs.mkdirSync( 'data/guilds/' + guild.id )
        }

        if ( Umeko.fileExists( './data/guilds/' + guild.id + '/blacklist.txt' ) ){ guild.leave(); return }

        cguild = guild;
        status = 'join';

    } catch (err) { console.log(err) }

})

client.on('guildDelete', guild => {

    try{

        if ( Umeko.fileExists( './data/guilds/' + guild.id + '/blacklist.txt' ) ){ return false }
        
        cguild = guild;
        status = 'leave';

    } catch (err) { console.log(err) }
    
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

fs.readdir('./cmds/xoria', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('Команды не найдены!')

    console.log(`Загружено ${jsfile.length} специальных команд ( Xoria Development )`)
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/xoria/${f}`)
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

    try{

        if (message.author.mute === true) {

            if ( message.author.mutedguild.includes( message.guild.id ) ){ message.delete() }

        }

    } catch (err) { console.log(err) }

})


function checkGuilds() {

    try{

        if ( cguild != '' ){

            const logs = client.channels.cache.find(channel => channel.id === cfg.guildlog );
            let blush = client.emojis.cache.get('941016253869490226');
            let love = client.emojis.cache.get('941016253852704788');
            let members = cguild.memberCount

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

    } catch (err) { console.log(err) }

}

client.on('ready', () =>{
    client.generateInvite("ADMINISTRATOR").then(invite => console.log(`Ссылка на добавление ${invite}`))
    setInterval( checkGuilds, 1 );
})

client.login( cfg.token )

Umeko = {

    catchError: function( name, err, id ) {

        try{

            let logchannel = client.channels.cache.find(channel => channel.id === id )
            let rainbow = client.emojis.cache.get('941016254133698570');

            const emb = new Discord.MessageEmbed()
                .setColor( '#ff003b' )
                .setTitle( `${rainbow} | Critical Error` )
                .addField( `Ошибка в ${name}`, err )
                .setTimestamp()
                .setFooter( client.user.username + ' | Admin', `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            logchannel.send( emb )

        } catch (err) { console.log(err) }

    },

    wrongArgs: function( msg, channel ) {

        try{

            let blush = client.emojis.cache.get('941016253869490226');

            const emb = new Discord.MessageEmbed()
                .setColor( '#ff003b' )
                .setTitle( `${blush} | Ошибка` )
                .addField( `Один из аргументов неправильный!`, msg )
                .setTimestamp()
                .setFooter( client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=256` )
            channel.send( emb )
        
        } catch (err) { console.log(err) }

    },

    cmdLog: function( server, user, cmd, args ) {

        try {

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

        } catch (err) { console.log(err) }

    },

    userLog: function( server, user, admin, title, description, msg ) {

        try{

            let alert = client.emojis.cache.get('941622064954109972');

            const emb = new Discord.MessageEmbed()
                .setColor( '#d000ff' )
                .setTitle( `${alert} | ${title}` )
                .addField( description, msg )
                .setThumbnail( server.iconURL() )
                .setTimestamp()
                .setFooter( admin.username, `https://cdn.discordapp.com/avatars/${admin.id}/${admin.avatar}.png?size=256` )
            user.send( emb )

        } catch (err) { console.log(err) }

    },

    readFile: function( path ) {
        try{
            return fs.readFileSync( path, 'utf8' )
        } catch (err) { console.log(err) }
    },

    writeFile: function( path, str ){
        try{
            fs.writeFileSync( path, str )
        } catch (err) { console.log(err) }
    },  

    removeFile: function( path ){
        try{
            fs.unlinkSync( path )
        } catch (err) { console.log(err) }
    },

    fileExists: function( path ){
        try{
            return fs.existsSync( path )
        } catch (err) { console.log(err) }
    },

    userBL: function( user ){
        
        try{ 

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

        } catch (err) { console.log(err) }

    }

}

client.on('messageReactionAdd', (reaction, user) => {

    try{

        let message = reaction.message.channel;

        const RoleMember = message.guild.roles.cache.get('970701507500605460');
        const RoleGMod = message.guild.roles.cache.get('970701619689844798');
        const RoleDBot = message.guild.roles.cache.get('970711124137889883');
        const RoleApps = message.guild.roles.cache.get('970711651135402034');

        const guildMembers = reaction.message.guild.members;
        const guildMember = guildMembers.cache.get(user.id);

        if (message.id === '970703858336669810' && user.id != '940617001305514035'){

            if (reaction.emoji.name === '👤') {
                guildMember.roles.add(RoleMember);
            } else if (reaction.emoji.name === '🎮') {
                guildMember.roles.add(RoleGMod);
            } else if (reaction.emoji.name === '🤖') {
                guildMember.roles.add(RoleDBot);
            } else if (reaction.emoji.name === '📦') {
                guildMember.roles.add(RoleApps);
            }

        }

    } catch (err) { console.log(err) }

})

client.on('messageReactionRemove', (reaction, user) => {

    try{

        let message = reaction.message.channel;

        const RoleMember = message.guild.roles.cache.get('970701507500605460');
        const RoleGMod = message.guild.roles.cache.get('970701619689844798');
        const RoleDBot = message.guild.roles.cache.get('970711124137889883');
        const RoleApps = message.guild.roles.cache.get('970711651135402034');

        const guildMembers = reaction.message.guild.members;
        const guildMember = guildMembers.cache.get(user.id);

        if (message.id === '970703858336669810' && user.id != '940617001305514035'){

            if (reaction.emoji.name === '👤') {
                guildMember.roles.remove(RoleMember);
            } else if (reaction.emoji.name === '🎮') {
                guildMember.roles.remove(RoleGMod);
            } else if (reaction.emoji.name === '🤖') {
                guildMember.roles.remove(RoleDBot);
            } else if (reaction.emoji.name === '📦') {
                guildMember.roles.remove(RoleApps);
            }

        }

    } catch (err) { console.log(err) }

})