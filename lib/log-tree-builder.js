import { parserLog } from './log-parser'
import LogEntry from './log-entry'

const buildLogTree = (logStream) => {

  let head = new LogEntry(null, 'Ingenio Full Build ', 0, null, [])
  let level = 0
  let currentLevel = 0

  return parserLog(logStream, (logEntry) => {
    if (head.logDate === null) {
      head.logDate = logEntry.logDate //set initial log date
    }

    currentLevel = logEntry.level

    while (currentLevel > level) {
      level++
      if (head.children.length === 0) {
        head = new LogEntry(head.logDate, '', level, head)
      } else {
        head = head.children[head.children.length - 1]
      }
      head.children = []
    }

    while (currentLevel < level) {
      level--
      head = head.parentNode
    }

    logEntry.parentNode = head
    head.children.push(logEntry)
  })
  .then(() => head)

}

export default {buildLogTree}
