/**
 * Logs tracks to console
 * Required env variables:
 *  - USERID: deeezer user id
 *  - TOKEN: deeezer api token
 */

const Deezer = require("../../src");

const onTrackChanged = async (songId) => {
  const song = await Deezer.getSong(songId);
  console.debug(song);
  const songString = `${song.title} - ${song.artist.name}`;
  console.log("Started playing:", songString);
};

const xmpp = new Deezer(process.env.USERID, process.env.TOKEN).initializeXMPP();

xmpp.on("online", (address) => console.log("Connected to", address._domain));
xmpp.on("offline", () => console.log("offline"));
xmpp.on("error", (err) => console.error(err.message));
xmpp.on("track", onTrackChanged);

xmpp.start();
