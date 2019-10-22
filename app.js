const TelegramBot = require('node-telegram-bot-api');
const weather = require('openweather-apis');

/* Telegram side
DESCRIPTION
This is an open source bot which sends current weather for you. Made by kaikkitietokoneista.net/bots.

ABOUT
I can send current weather for you.

BOTPIC
botpic.jpg

CREATE Commands to auto complete
weather - choose city from a list
----------------------------------------------------------
*/

/* CONFIGURE WEATHER*/
weather.setLang('en');

var city = 'Helsinki';

weather.setUnits('metric');

weather.setAPPID('YOUR_OPENWEATHERMAP_APPID');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR_TELEGRAM_BOT_API';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/weather (.+)/, (msg, match) => {

  const city = match[1]; // the captured "city"

  weather.setCity(city);

  weather.getAllWeather(function(err, json){
    if(err) throw (err);
    //console.log(json);

    if (json.cod == "429") {
      bot.sendMessage(msg.chat.id, "We have reached our API limit of current minute. 😔");
    }
    if (json.cod == "404") {
      bot.sendMessage(msg.chat.id, "City not found. 🧐");
    }  else {
      //var imgurl = 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png';
      //bot.sendPhoto(msg.chat.id, imgurl)

      /* icon to emoji */
      if (json.weather[0].icon == "01d") {
        var weatheremoji = '🌞';
      }
      else if (json.weather[0].icon == "02d" || "02n") {
        var weatheremoji = '⛅';
      }
      else if (json.weather[0].icon == "03d" || "03n") {
        var weatheremoji = '☁';
      }
      else if (json.weather[0].icon == "04d"|| "04n") {
        var weatheremoji = '☁';
      }
      else if (json.weather[0].icon == "09d" || "09n") {
        var weatheremoji = '🌧';
      }
      else if (json.weather[0].icon == "10d" || "10n") {
        var weatheremoji = '🌧';
      }
      else if (json.weather[0].icon == "11d" || "11n") {
        var weatheremoji = '⛈';
      }
      else if (json.weather[0].icon == "13d" || "13n") {
        var weatheremoji = '❄';
      }
      else if (json.weather[0].icon == "50d" || "50n") {
        var weatheremoji = '🌫';
      }

      bot.sendMessage(msg.chat.id, "City: " + city + "\nTemperature: " + json.main.temp + "°C🌡\nDescription: " + json.weather[0].description + weatheremoji + "\nHumidity: " + json.main.humidity + "%" + "\nPressure: " + json.main.pressure + " hPa" + "\nWind: " + json.wind.speed + "m/s💨\nCountry: " + json.sys.country);
    }
  });
});

//Vaihda onText iin tämä
bot.on('message', (msg) => {

  var command = "start";
  if (msg.text.toString().toLowerCase().includes(command)) {
    bot.sendMessage(msg.chat.id, "This is an open source bot which tells you the current weather. This bot is made by kaikkitietokoneista.net/bots. You can find the source code of this bot in https://github.com/kaikkitietokoneista/weather-tgbot. \n\nCommands:\n/weather <cityname> - gives you the current weather in a chosen city\n/weather - gives you a list of the available cities");
  }
  var command = "/weather";
  if (msg.text.toString().toLowerCase() == command) {
    bot.sendMessage(msg.chat.id, "Choose your city from a list or send it hier with syntax /weather yourcity.", {
      "reply_markup": {
        "keyboard": [["/weather Helsinki"], ["/weather New York"], ["/weather Berlin"], ["/weather Sydney"], ["/weather London"], ["/weather Beijing"], ["/weather Tokyo"], ["/weather Johannesburg"], ["/weather Cairo"]]
      }
    });
  }
});
