# underrealm

## Installation

Install all dependencies

```
yarn install
```

Install Metacraft CLI

```
npm install -g @metacraft/cli@latest
```

## Game

- Install [Cocos Dashboard](https://www.cocos.com/en/creator)
- Install Cocos Creator version `3.8.3` or newer
- Install deps for Game by `yarn install` under `game` folder
- Open `game` folder with Cocos creator
- Configure network endpoint under `./game/assets/scripts/network/util.ts` (line 6), either use remove endpoint or local endpoint at [Card Engine](https://github.com/cocrafts/engines)

### Build game

- Build game to `launcher/assets/murg`, we are currently using `web-mobile` build option

## Launcher

Prepare `.env` file follow the `.env.example`

Run launcher

```
cd launcher && yarn dev
```

### Deploy launcher

In `launcher` directory

- Prepare game build as the previous `game` section
- Prepare .env file with format `.env.{stage}`, See `.env.example`
- Deploy using `sst`, running

```
yarn deploy launcher --stage <production | development>
```
