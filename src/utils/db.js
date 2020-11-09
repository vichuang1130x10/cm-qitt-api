import sql from 'mssql'
import { config } from '../config'

export const connect = (mssqlConfig = config) => {
  return sql.connect(config)
}
