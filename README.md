# Turborepo Cache

> ⚠️ This is still in early development, please don't use on real production ⚠️

A self-hosted cache server for [Turborepo](https://turborepo.org) with backed by
object storage (currently S3) or local files. Pull Requests and Issues for other
platforms are welcomed.

## Usage

### Example configuration file

```yaml
# Choose between local or s3, you can't use both
#local:
#  dir: path/to/cache-dir

#s3:
#  endpoint: http://minio.example.com:9000
#  bucket: test-bucket

#  access_key_id: EXAMPLE_ACCESS_KEY
#  secret_access_key: EXAMPLE_SECRET_KEY

# Authentication
#auth:
# You can choose whether or not to allow unauthenticated read access
#  allow_unauthenticated_reads: false
# A list of tokens
#  tokens:
#    - 'some-secret-token'
```

### Deploying

We recommend deploying using Docker or into the Kubernetes:

```sh
docker pull ghcr.io/siberianmh/turborepo-cache
$ docker run -v /path/to/cache/dir:/data -v config.yml:/opt/turborepo-cache/config.yaml -p 5000:5000 ghcr.io/siberianmh/turborepo-cache
```

## Turborepo configuration

Add the `--api` with `--token` flags when executing a command:

```sh
npx turborepo run build --api="https://turbocache.example.com" --token="123456"
```

## Limitations

- This is still early, so the API on this server can change immediately.
- You still need to login into the Vercel account and link the project
  - I do not fully understand if this is a bug or "feature"
- There is no support for "slug" (?) and "teams", but probably it's only time
  issue

## License

[MIT](LICENSE)
