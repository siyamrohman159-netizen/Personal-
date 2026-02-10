module.exports = {
  config: {
    name: "unsend",
    aliases: ["u", "r", "un", "uns"],
    version: "1.4",
    author: "siyuuu",
    countDown: 5,
    role: 0,
    description: "Unsend bot's message",
    category: "box chat",
    guide: "Reply the bot message and use {pn}"
  },

  onStart: async function ({ message, event, api }) {
    if (!event.messageReply)
      return message.reply("❌ Please reply to the bot message you want to unsend.");

    if (event.messageReply.senderID !== api.getCurrentUserID())
      return message.reply("❌ You can only unsend bot messages.");

    try {
      await api.unsendMessage(event.messageReply.messageID);
    } catch (e) {
      message.reply("❌ Failed to unsend the message.");
    }
  }
};
