const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const CommandHandler = require('./handlers/commandHandler');
const MessageHandler = require('./handlers/messageHandler');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const commandHandler = new CommandHandler(bot);
const messageHandler = new MessageHandler(bot);

// Register command handlers
bot.onText(/\/start/, (msg) => commandHandler.handleStart(msg));
bot.onText(/\/find/, (msg) => commandHandler.handleFind(msg));
bot.onText(/\/leave/, (msg) => commandHandler.handleLeave(msg));

// Register message handler
bot.on('message', (msg) => messageHandler.handleMessage(msg));

console.log('VibeMingle Bot is running...');