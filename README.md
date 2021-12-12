# Turborepo Cache

> ⚠️ This is still in early development, please don't use on real production ⚠️

A self-hosted cache server for [Turborepo](https://turborepo.org) with backed by
object storage (currently S3) or local files. Pull Requests and Issues for other
platforms are welcomed.

## Usage

## Turborepo configuration

Add the `--api` with dummy `--token` flags when executing a command:

```sh
npx turborepo run build --api="https://turbocache.example.com" --token="123456"
```

## Limitations

- This is still early, so the API on this server can change immediately.
- There is no authentication, but this is on the roadmap
- You still need to login into the Vercel account and link the project
  - I do not fully understand if this is a bug or "feature"
- Current version of Turborepo is not supported "--api" flag 🙉
- There is no support for "slug" (?) and "teams", but probably it's only time
  issue

## License

[MIT](LICENSE)
