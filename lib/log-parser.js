
import fs from 'fs'
import readline from 'readline'
import LogEntry from 'log-entry'
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

  if (logDate < startDate) {
    //if log finieshed next day
    logDate.setDate(logDate.getDate() + 1)
  }

  return logDate
}

const parseLine = (logLine, startDate) => {
  const result = logLine.match(logEntryPattern)

  if (result) {
    const logDate = parseLogDate(result[1], startDate);
    const tabs = result[2]
    const message = result[3]
    let level = 0

    if (tabs && tabs.length > 0) {
      level = tabs.length
    }
    return new LogEntry(logDate, message, level)
  }

  return null
}

const parser = (filePath, callBack) => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  })

  let lineNo = 0
  let startDate = null

  lineReader.on('line', (line) => {
    if (lineNo === 1) {
      //Parse startDate from second line
      startDate = parseStartDate(line)
    }
    else{
      callBack(parseLine(line, startDate))
    }

    lineNo++
  })
}

export {
  parser
}
