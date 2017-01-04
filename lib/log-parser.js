import readline from 'readline'
import LogEntry from './log-entry'
import moment from 'moment'

const startDatePattern = /^Started '(.*)' on(.*)$/
const logEntryPattern = /^\[(\d{2}:\d{2}:\d{2})\][ |\w]:(\t*)(.*)$/

const parseStartDate = (lineWithDate) => {
  const result = lineWithDate.match(startDatePattern)
  if (result) {
    return moment(result[1], 'ddd MMM DD HH:mm:ss PST yyyy').toDate()
  }
  return null
}

const parseLogDate = (logDateString, startDate) => {
  const logDate = new Date(startDate.getTime())

  const hour = logDateString.substring(0, 2)
  const min = logDateString.substring(3, 5)
  const sec = logDateString.substring(6, 8)

  logDate.setHours(hour, min, sec, 0)

  //TODO: find proper way to resolve of the next day issue
  // if (logDate < startDate) {
  //   //if log finieshed next day
  //   logDate.setDate(logDate.getDate() + 1)
  // }

  return logDate
}

const parseLine = (logLine, startDate) => {
  const logEntryMatches  = logLine.match(logEntryPattern)

  if (logEntryMatches) {
    const logDate = parseLogDate(logEntryMatches [1], startDate)
    const tabs = logEntryMatches [2]
    const message = logEntryMatches [3]
    let level = 0

    if (tabs && tabs.length > 0) {
      level = tabs.length
    }
    return new LogEntry(logDate, message, level)
  }

  return null
}

const parserLog = (logStream, cb) => {
  const lineReader = readline.createInterface({
    input: logStream
  })

  let lineNo = 0
  let startDate = null

  lineReader.on('line', (line) => {
    if (lineNo === 1) {
      //Parse startDate from second line
      startDate = parseStartDate(line)
    } else {
      const logEntry = parseLine(line, startDate)
      
      if (logEntry) {
        cb(logEntry)
      }
    }

    lineNo++
  })

  return new Promise((resolve, reject) => {
    lineReader.on('close', () => resolve())
    lineReader.on('error', () => reject())
  })
}

export {
  parserLog
}
