import {parser} from './log-parser'
import {builder} from './log-tree-builder'
import LogEntry from 'log-entry'

let head = new LogEntry('00:00:00', 'HEAD of the Log', 0) //TODO: parse date from Log

parser(
  './data/Ingenio_Projects_keen_249.0.0.113.log',
  (logEntry) => builder(logEntry, head)
)

export default {}
