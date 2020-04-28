/**
 * Updates discord status with current track
 * Required env variables:
 *  - USERID: deeezer user id
 *  - TOKEN: deeezer api token
 *  - DISCORD_TOKEN: discord user token
 */

const axios = require("axios");
const Deezer = require("..");

const autoClearTime = 10 * 60 * 1000; // Auto-clear after 10 minutes

const updateDiscordStatus = async (status) =>
  await axios({
    url: "https://discordapp.com/api/v6/users/@me/settings",
    method: "PATCH",
    data: {
      custom_status: {
        text: status,
        expires_at: new Date(
          new Date().getTime() + autoClearTime
        ).toISOString(),
        emoji_name: "🎶",
      },
    },
    headers: {
      Authorization: process.env.DISCORD_TOKEN,
    },
  });

const onTrackChanged = async (songId) => {
  const song = await Deezer.getSong(songId);
  const songString = `${song.title_short} - ${song.artist.name}`;
  console.log(`Now playing: 🎵 ${songString}`);
  await updateDiscordStatus(songString);
};

const xmpp = new Deezer(process.env.USERID, process.env.TOKEN).initializeXMPP();

xmpp.on("online", (address) => console.log("Connected to", address._domain));
xmpp.on("offline", () => console.log("offline"));
xmpp.on("error", (err) => console.error(err.message));
xmpp.on("track", onTrackChanged);

xmpp.start();
