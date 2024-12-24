const userService = require('../services/userService');

class MessageHandler {
  constructor(bot) {
    this.bot = bot;
  }

  handleMessage(msg) {
    if (msg.text.startsWith('/')) return; // Ignore commands
    
    const userId = msg.from.id;
    const user = userService.getUser(userId);
    
    if (!user) return;
    
    const partnerId = user.chatId;
    if (partnerId) {
      this.bot.sendMessage(partnerId, msg.text);
    }
  }
}

module.exports = MessageHandler;