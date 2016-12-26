import fs from 'fs'
import request from 'request'

const createLogStreamFromTeamCitySite = (buildId, sessionId) => {
  const j = request.jar()
  const cookie = request.cookie(`TCSESSIONID=${sessionId}`)
  const url = `http://teamcity.corp.ingenio.com/downloadBuildLog.html?buildId=${buildId}`

  j.setCookie(cookie, url)
  return () => request({url: url, jar: j})
}

const createLogStreamFromFile = (filePath) => {
  return () => fs.createReadStream(filePath)
}

export {createLogStreamFromTeamCitySite, createLogStreamFromFile}
