//import {parserLog} from './log-parser'
import {builderLogTree} from './log-tree-builder'
//import LogEntry from 'log-entry'
import {log} from './utils/console-utils'
//import fs from 'fs'

//const stream = fs.createWriteStream('../test.txt')
//stream.open()

const printLogEntry = (logEntry) => {

  const logEntryString =
    `${logEntry.logDate} : ${logEntry.level} : ${logEntry.logMessage}`

  log.info(logEntryString)
  //stream.write(logEntryString + '\n')

  if (logEntry.children && logEntry.children.length > 0) {
    for (let i = 0; i < logEntry.children.length; i++) {
      printLogEntry(logEntry.children[i])
    }
  }
}

builderLogTree('./data/Ingenio_Projects_keen_249.0.0.113.log')
  .then((tree) => {
    log.json(tree.children.length)
    for (let i = 0; i < tree.children.length; i++) {
      printLogEntry(tree.children[i])
    }
    //stream.end()
  })
  .catch((error) => {
    console.error('ERROR!!!')
    log.json(error)
  })

export default {}
