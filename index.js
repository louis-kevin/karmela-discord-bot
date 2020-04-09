
const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const http = require('http');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    const baseRoom = '697643963040923698';
    let rooms = {
        '!bemvindo': '697399854363705364',
        '!hall': '697398289774936084',
        '!regras': '697400194144403486',
        '!chat': '697403374726938625',
        '!cargos': '697405210867531806',
        '!eventos': '697406878153572374',
        '!avisos': '697406939193409606',
        '!builds': '697405001232023562',
        '!comandos': '697606442407952405',
    };

    if(channelID !== '697643963040923698') return;

    if(userID !== '158248858567180288' && userID !== '156853395783811072') return;

    if(message === '!salas'){
        bot.sendMessage({
            to: baseRoom,
            message: Object.keys(rooms).join(', ')
        });

        return;
    }

    let [command, ...messageSplited] = message.split(' ');

    let room = rooms[command];

    if(!room){
        bot.sendMessage({
            to: baseRoom,
            message: 'Opa, essa sala não existe, babaca'
        });

        return;
    }

    bot.sendMessage({
        to: room,
        message: messageSplited.join(' ')
    });
});

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });
    res.write('Hey');
    res.end();
}).listen(4000);
