import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Readable } from 'node:stream'
import { ICache } from '../interface'
import { config } from '../../config'

export class S3Store implements ICache {
  private s3: S3Client = new S3Client({
    region: 'us-east-1',
    forcePathStyle: true,
    endpoint: config.s3.endpoint,
    credentials: {
      accessKeyId: config.s3.access_key_id,
      secretAccessKey: config.s3.secret_access_key,
    },
  })

  public constructor() {}

  private bucket = config.s3.bucket

  public async getFile(key: string): Promise<Buffer> {
    try {
      const { Body } = await this.s3.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      )

      if (!Body) {
        return Buffer.from('')
      }

      const body = await this.streamToBuffer(Body as Readable)
      return body
    } catch (err) {
      console.debug('File not found, defaulting to empty buffer')
      return Buffer.from('')
    }
  }

  public async putFile(key: string, data: Buffer): Promise<void> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: data,
        ACL: 'public-read',
      }),
    )

    return
  }

  private streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Array<Uint8Array> = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
  }
}
