import * as path from 'node:path'
import * as fs from 'fs-extra'
import { ICache } from '../interface'

export class LocalStore implements ICache {
  public constructor() {}

  public async getFile(key: string): Promise<Buffer> {
    if (await this.hasFile(key)) {
      return await fs.readFile(this.getPath(key))
    }
    return Buffer.from('')
  }

  public async putFile(key: string, data: Buffer): Promise<void> {
    if (!(await fs.pathExists(this.getPath(key)))) {
      await fs.mkdirp(path.dirname(this.getPath(key)))
      await fs.writeFile(this.getPath(key), data)
      return
    }
    return
  }

  private async hasFile(key: string) {
    if (await fs.pathExists(this.getPath(key))) {
      return (await fs.stat(this.getPath(key))).isFile()
    }

    return false
  }

  private getPath(...keys: Array<string>) {
    return path.resolve(
      process.env.BUILD_WORKSPACE_DIRECTORY!,
      'turbo-test',
      ...keys,
    )
  }
}
