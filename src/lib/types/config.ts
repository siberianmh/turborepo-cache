interface ILocal {
  readonly dir: string
}

interface IS3Config {
  readonly endpoint: string
  readonly bucket: string
  readonly access_key_id: string
  readonly secret_access_key: string
}

interface IAuthConfig {
  readonly allow_unauthenticated_reads: boolean
  readonly tokens: Array<string>
}

export interface IConfig {
  readonly local: ILocal
  readonly s3: IS3Config
  readonly auth: IAuthConfig
}
