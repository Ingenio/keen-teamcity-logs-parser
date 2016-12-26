import {buildVisualizableLogTree} from './visualizable-log-tree-builder'
import {log} from './utils/console-utils'
import fs from 'fs'
import {
  //createLogStreamFromTeamCitySite,
  createLogStreamFromFile
} from './log-stream-builder.js'

const teamCityBuildId = 27659
//const teamCitySessionId = 'PROVIDE_YOUR_CURRENT_TEAM_CITY_SESSIONID'//get from TCSESSIONID cookie
//TODO: find more proper way of Authorization

//const createLogStream = createLogStreamFromTeamCitySite(teamCityBuildId, teamCitySessionId)
const createLogStream = createLogStreamFromFile('./data/Ingenio_Projects_keen_249.0.0.113.log')

buildVisualizableLogTree(createLogStream())
  .then(head => {
    const json = JSON.stringify(head)
    log.info(json)
    fs.writeFile('./data/log.json', json)
    return head
  })
  .catch((error) => {
    log.error(error)
  })

export default {}
