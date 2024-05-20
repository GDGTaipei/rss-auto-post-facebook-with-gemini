// configuration
var apiToken = '6574132851:AAEOqmS8fUrGaNM7Sts1AIg0IkwAicb_kjY';
var apiUrl   = "https://api.telegram.org/bot"+apiToken;
const BOT_TOKEN = '6574132851:AAEOqmS8fUrGaNM7Sts1AIg0IkwAicb_kjY';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

function doGet(e){
  return ContentService.createTextOutput("Method GET not allowed");
}

const autoPostMessage = async () => {
  await postMessage(chatId)
};


