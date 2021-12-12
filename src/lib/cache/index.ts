import { ICache } from './interface'
import { LocalStore } from './local'
import { S3Store } from './s3'

export const getStore = (fileStrategy: 's3' | 'local'): ICache => {
  switch (fileStrategy) {
    case 's3':
      return new S3Store()
    case 'local':
    default:
      return new LocalStore()
  }
}
