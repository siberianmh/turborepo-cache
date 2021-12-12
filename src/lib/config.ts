import * as yaml from 'js-yaml'
import * as fs from 'fs-extra'
import * as path from 'path'
import { IConfig } from './types'

export const loadConfig = (configFile?: string) => {
  let configPath
  if (!configFile) {
    if (process.env.NODE_ENV === 'development') {
      configPath = path.resolve('config.yml')
    } else {
      configPath = path.resolve('/opt/turborepo-cache/config.yaml')
    }
  } else {
    configPath = path.resolve(configFile)
  }

  const content = fs.readFileSync(path.resolve(configPath), {
    encoding: 'utf-8',
  })
  const parsedContent = (yaml.load(content) as IConfig) ?? {}

  return parsedContent
}

export const config: IConfig = loadConfig()
