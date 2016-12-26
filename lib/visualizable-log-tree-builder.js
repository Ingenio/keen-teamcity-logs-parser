//import {log} from './utils/console-utils'
import {buildLogTree} from './log-tree-builder'
//import moment from 'moment'
//import fs from 'fs'

//const stream = fs.createWriteStream('../test.txt')
//stream.open()

const buildTree = (head, startDate) => {

  // const logEntryString =
  //   `${moment(head.logDate).format('HH:mm:ss')} : ${head.level} : ${head.logMessage}`
  // log.info(logEntryString)
  //stream.write(logEntryString + '\n')


  const headOfVisualizableTree = {}

  headOfVisualizableTree.name = head.logMessage
  headOfVisualizableTree.value =
    (head.logDate.getTime() - startDate.getTime()) / 1000

  if (head.children && head.children.length > 0) {
    headOfVisualizableTree.children = []

    headOfVisualizableTree.children.push(
      buildTree(head.children[0], head.logDate))

    if (head.children.length > 1) {
      for (let i = 1; i < head.children.length; i++) {
        headOfVisualizableTree.children.push(
          buildTree(
            head.children[i], head.children[i - 1].logDate))
      }
    }
  }

  return headOfVisualizableTree
}

const buildVisualizableLogTree = (logStream) => {
  return buildLogTree(logStream)
    .then(head => buildTree(head, head.logDate))
}
//stream.end()

export {buildVisualizableLogTree}
