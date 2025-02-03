import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sourceFile = path.resolve(__dirname, '../', 'to', '../src/types.ts')
const destinationDir = path.resolve(__dirname, '../', 'to', '../dist/types')
const destinationFile = path.join(destinationDir, 'index.d.ts')

if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true })
}

fs.copyFileSync(sourceFile, destinationFile)
console.log('Types copied successfully.')
