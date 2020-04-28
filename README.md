[![NPM](https://nodei.co/npm/deezer-playing-notifications.png)](https://www.npmjs.com/package/deezer-playing-notifications)

# deezer-playing-notifications

Reverse ingeneering of deezer real-time websocket messaging api to get played tracks.

This allows to make a small [lastfm](https://last.fm/)-like self-hosted service.

## Usage:

You will need a USERID _(Deezer userId)_ and TOKEN _(From [deezer api](https://developers.deezer.com) or from your browser cache)_:

```js
const Deezer = require("deezer-playing-notifications");

const xmpp = new Deezer(USERID, TOKEN).initializeXMPP();
xmpp.on("track", (trackId) => console.log("Track ID:", trackId));
xmpp.start();
```

## API

`new Deezer()` requires a valid userId and token to connect.

`initializeXMPP` method returns an [xmpp client](https://www.npmjs.com/package/@xmpp/client), you may listen to any events as you normally would.

It also introduces a new event: `"track"` which sends the `songId` on track change.

Deezer also exposes the following static method:

- `getSong` (async) which takes a songId and returns a deezer [track](https://developers.deezer.com/api/track)

## Examples

Available [here](https://github.com/nSimonFR/deezer-playing-notifications/tree/master/examples):

- [logToConsole](https://github.com/nSimonFR/deezer-playing-notifications/tree/master/examples/logToConsole.js): simply logs tracks to console
- [updateStatus](https://github.com/nSimonFR/deezer-playing-notifications/tree/master/examples/updateStatus.js): updates discord status on track change

## Contributing & LTS

Contributions are welcomed, just consider this more as a POC rather than a real library, compatibility may break at any moment and I cannot garantee support.

Ideas of what could be added / updated:

- Basic configuration (eslint/prettier etc)
- Tests to ensure compatibility (jest preffered)
- Rewrite in typescript
- Support for other types of messages.

MIT @ nSimonFR
