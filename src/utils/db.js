import sql from 'mssql'
import { config } from '../config'

import { Connection } from 'tedious'

export const connect = (mssqlConfig = config) => {
  return new Connection(mssqlConfig)
}
