const TelegramBot = require('node-telegram-bot-api');
const weather = require('openweather-apis');

/* CONFIGURE WEATHER*/
weather.setLang('en'); //Language

weather.setCity('Helsinki'); //City

weather.setUnits('metric');

weather.setAPPID('OPENWEATHER_APPID'); //Get your own appid from openweather

// replace the value below with the Telegram token you receive from @BotFather
const token = 'TELEGRAM BOT TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {

  var command = "/weather";
  if (msg.text.toString().toLowerCase().includes(command)) {
    weather.getSmartJSON(function(err, json){
      if(err) console.log(err);
      console.log(json);
      bot.sendMessage(msg.chat.id, "Temperature: " + json.temp + "°C\nDescription: " + json.description + "\nHumidity: " + json.humidity + "%" + "\nPressure: " + json.pressure + " hPa");
    });
  }

});
