const axios = require("axios");
const { client } = require("@xmpp/client");

const tryJson = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return false;
  }
};

class Deezer {
  static getSong = async (songId) => {
    const res = await axios(`https://api.deezer.com/track/${songId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return res.data;
  };

  constructor(username, token) {
    this.username = username;
    this.token = token;
  }

  initializeXMPP = () => {
    this.xmpp = client({
      service: "wss://messaging.deezer.com/websocket",
      username: this.username,
      password: this.token,
    });

    this.xmpp.on("stanza", this.onMessage);

    return this.xmpp;
  };

  treatMessage = async ({ ACTION, VALUE }) => {
    if (ACTION !== "PLAY") return;
    this.xmpp.emit("track", VALUE.SNG_ID);
  };

  onMessage = async (stanza) => {
    if (stanza.name !== "message") return;

    const event = stanza.children.find((message) => message.name === "event");
    const messages = event.children
      .map((event) => event.children.map((item) => item.children))
      .flat(2);

    const readableMessages = messages.map(tryJson).filter((msg) => msg);
    readableMessages.forEach(this.treatMessage);
  };
}

module.exports = Deezer;
