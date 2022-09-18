import fs from 'fs'
import path from 'path'

const loadGqlFile = (type:any) => {
  const filePath = path.join(__dirname, '../api', type)
  return fs.readFileSync(filePath, 'utf-8')
}

export default loadGqlFile