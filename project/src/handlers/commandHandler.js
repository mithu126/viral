const userService = require('../services/userService');

class CommandHandler {
  constructor(bot) {
    this.bot = bot;
  }

  handleStart(msg) {
    const userId = msg.from.id;
    const username = msg.from.username;
    
    const user = userService.createUser(userId, username);
    
    this.bot.sendMessage(userId, 
      'Welcome to VibeMingle! 👋\n' +
      'Use /find to start looking for someone to chat with.\n' +
      'Your random ID is: ' + user.randomId
    );
  }

  handleFind(msg) {
    const userId = msg.from.id;
    
    if (!userService.getUser(userId)) {
      this.bot.sendMessage(userId, 'Please /start the bot first!');
      return;
    }
    
    if (userService.getUser(userId).chatId) {
      this.bot.sendMessage(userId, 'You are already in a chat! Use /leave first.');
      return;
    }
    
    userService.addToWaiting(userId);
    this.bot.sendMessage(userId, 'Looking for a chat partner... 🔍');
    
    const partnerId = userService.findChatPartner(userId);
    if (partnerId) {
      userService.setChatPartner(userId, partnerId);
      userService.setChatPartner(partnerId, userId);
      
      this.bot.sendMessage(userId, 'Chat partner found! You can start chatting now. Use /leave to end the chat.');
      this.bot.sendMessage(partnerId, 'Chat partner found! You can start chatting now. Use /leave to end the chat.');
    }
  }

  handleLeave(msg) {
    const userId = msg.from.id;
    
    if (!userService.getUser(userId)) {
      return;
    }
    
    const partnerId = userService.endChat(userId);
    if (partnerId) {
      this.bot.sendMessage(userId, 'Chat ended. Use /find to start a new chat!');
      this.bot.sendMessage(partnerId, 'Your chat partner left. Use /find to start a new chat!');
    } else {
      userService.removeFromWaiting(userId);
      this.bot.sendMessage(userId, 'You\'re not in a chat. Use /find to look for a partner.');
    }
  }
}

module.exports = CommandHandler;