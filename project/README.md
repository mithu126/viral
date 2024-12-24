# VibeMingle

A Telegram bot that allows users to chat randomly with each other, similar to Omegle.

## Features

- Random chat matching
- Unique user IDs
- Basic chat commands (/start, /find, /leave)
- Privacy-focused (users are anonymous)

## Setup

1. Create a new bot with BotFather on Telegram and get your bot token
2. Copy your bot token to the .env file
3. Install dependencies: `npm install`
4. Start the bot: `npm start`

## Commands

- `/start` - Initialize the bot and get your random ID
- `/find` - Look for a chat partner
- `/leave` - Leave the current chat

## Security Notes

- User data is stored in memory only
- Messages are not logged or stored
- Users are identified by random IDs
- No personal information is shared between users