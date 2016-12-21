import { parser } from './log-parser';
import { log } from './utils/console-utils' 

parser(
  './lib/data/Ingenio_Projects_keen_249.0.0.113.log',
  (line) => log.json(line)
);

export default {}
