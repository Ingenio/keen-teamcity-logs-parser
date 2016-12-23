import {buildVisualizableLogTree} from './visualizable-log-tree-builder'
import {log} from './utils/console-utils'
import fs from 'fs'

buildVisualizableLogTree('./data/Ingenio_Projects_keen_249.0.0.113.log')
  .then(head => {
    const json = JSON.stringify(head)
    log.info(json)
    fs.writeFile('../json.txt', json)
    return head
  })
  .catch((error) => {
    log.error(error)
  })

export default {}
