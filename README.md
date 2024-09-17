# Under Realm

Free-to-play Strategy Trading Card game

Under Realm: Rise of Magic takes place in the chaotic, fragmented world of ATEM, where humans and other races are constantly fighting each other, to quench the endless thirst for power, and wealth, and gradually take control over ATEM.

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
- Game depends on `@underrealm/murg` core engine implemented in `engine/murg` need to be pre-build to Javascript

```
cd engine && yarn build
```

### Build game

- Build game to `launcher/assets/murg`, we are currently using `web-mobile` build option

## Launcher

Prepare `.env` file follow the `.env.example`

Run launcher

```
cd launcher && yarn dev
```

### Convention

A component inside a feature/screen will be treated as section/fragment which is stateful with the feature's context, no need to pass all as props, it also can do API query/mutation by itself.

#### Working with GraphQL, Apollo, Codegen

Update schema, generated types from API

```
# at root
yarn codegen:graphql
```

The command will generate code in `launcher/utils/graphql/sdk.ts` which includes graphql types, hooks, utils for working with API.

For new query/mutation, write it inside `launcher/utils/graphql/query` or `launcher/utils/graphql/mutation`. Codegen will ready the files in these directories to generate code.

```graphql
query profile {}
```

After codegen, you will have a hook name `useProfileQuery`, usage:

```typescript
const ProfileScreen = () => {
    const { data, loading, error } = useProfileQuery();

    return ...
}
```

### Deploy launcher

In `launcher` directory

- Prepare game build as the previous `game` section
- Prepare .env file with format `.env.{stage}`, See `.env.example`
- Deploy using `sst`, running

```
yarn deploy launcher --stage <production | development>
```

## API

- `.env` file at `api` dir, follow `api/.env.example`
- `jwk.json` at `api` dir to load by `jsonwebtoken`

Run the API

```
yarn dev
```

To add new query/mutation, you need to define it in `api/schema.graphql`. And run codegen to generate resolver types, object types, the implement the resolver.

_Note: codegen will run by fetching introspection from API endpoint, remember to run the API first_

```
# at root
yarn codegen:graphql
```

### Convention

All mutations must have tests!

Logger & Error handling

- By default, any internal error will be logged out via a middleware, we need to throw wrapped the error with a meaningful message.
- If catching error without re-throw, prefer using `logger.warn`. In normal case, use `logger.info`

## CLI

Build and link CLI to global scope

```
cd cli && yarn install && yarn setup
```

Run the CLI

```
ur --help
```

Each time having any change, you just need to rebuild to apply change (no need to link as it's already linked). Or you can re-run `yarn setup` for a fresh build and link.

```
yarn build
```

## Core engine

![](assets/demo.png)
