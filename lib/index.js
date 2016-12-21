import { parseLine } from './log-parser';
import { log } from './utils/console-utils'

const logLine = '[02:37:22] :		 [Compute revision for \'Git Keen\'] Upper limit revision: f665570f36e27ab32d8254344594d2d809f0e624, maxModId 16184';
const logEntry = parseLine(logLine);

log.json(logEntry)

export default {}
