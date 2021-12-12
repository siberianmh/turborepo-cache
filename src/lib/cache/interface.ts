export interface ICache {
  readonly getFile: (key: string) => Promise<Buffer>
  readonly putFile: (key: string, data: Buffer) => Promise<void>
}
