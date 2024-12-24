const { v4: uuidv4 } = require('uuid');

class UserService {
  constructor() {
    this.users = new Map();
    this.waitingUsers = new Set();
  }

  createUser(userId, username) {
    const user = {
      id: userId,
      username: username || 'Anonymous',
      chatId: null,
      randomId: uuidv4().substring(0, 8)
    };
    this.users.set(userId, user);
    return user;
  }

  getUser(userId) {
    return this.users.get(userId);
  }

  setChatPartner(userId, partnerId) {
    if (this.users.has(userId)) {
      this.users.get(userId).chatId = partnerId;
    }
  }

  addToWaiting(userId) {
    this.waitingUsers.add(userId);
  }

  removeFromWaiting(userId) {
    this.waitingUsers.delete(userId);
  }

  findChatPartner(userId) {
    for (const waitingUserId of this.waitingUsers) {
      if (waitingUserId !== userId) {
        this.waitingUsers.delete(waitingUserId);
        return waitingUserId;
      }
    }
    return null;
  }

  endChat(userId) {
    const user = this.users.get(userId);
    const partnerId = user?.chatId;
    
    if (user) {
      user.chatId = null;
    }
    
    if (partnerId && this.users.has(partnerId)) {
      this.users.get(partnerId).chatId = null;
    }
    
    return partnerId;
  }
}

module.exports = new UserService();