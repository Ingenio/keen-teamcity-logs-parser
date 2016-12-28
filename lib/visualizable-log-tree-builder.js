import { buildLogTree } from './log-tree-builder'

const getNextLogDate = (node) => {
  const parentNode = node.parentNode
  const grandParentNode = parentNode.parentNode
  if (grandParentNode === null) {
    return node.logDate
  } else {
    const parentIndex = grandParentNode.children.indexOf(parentNode)
    if (parentIndex < grandParentNode.children.length - 1) {
      return grandParentNode.children[parentIndex + 1].logDate
    } else {
      return getNextLogDate(parentNode)
    }
  }
}

const mmss = secs => {
  if(secs <= 0)
    return '(0s)'

  const minutes = Math.floor(secs / 60)
  const seconds = secs % 60
  let ss = (seconds > 0) ? `${seconds}s` : ''
  const mm = (minutes > 0) ? `${minutes}m` : ''

  if (ss.length > 0 && mm.length > 0) {
    ss = seconds > 10 ? `:${ss}` :`:0${ss}`
  }

  return `(${mm}${ss})`
}

const buildTree = (head, nextDate) => {
  const headOfVisualizableTree = {}

  headOfVisualizableTree.value =
    (nextDate.getTime() - head.logDate.getTime()) / 1000

  let name = null
  if (head.logMessage.length > 100) {
    name = head.logMessage.substring(0, 100) + '...'
  } else {
    name = head.logMessage
  }

  const duration = mmss(headOfVisualizableTree.value)
  if (!name.endsWith(duration)) {
    headOfVisualizableTree.name = `${name} ${duration}`
  } else {
    headOfVisualizableTree.name = name
  }

  let leaf = null

  if (head.children && head.children.length > 0) {
    headOfVisualizableTree.children = []

    for (let i = 0; i < head.children.length; i++) {
      if (i < head.children.length - 1) {
        leaf = buildTree(head.children[i], head.children[i + 1].logDate)
      } else {
        leaf = buildTree(head.children[i], getNextLogDate(head.children[i]))
      }
      headOfVisualizableTree.children.push(leaf)
    }
  }
  return headOfVisualizableTree
}

const buildVisualizableLogTree = (logStream) => {
  return buildLogTree(logStream)
    .then(head => {
      let tree = buildTree(head, head.logDate)
      return tree
    })
}

export  {buildVisualizableLogTree }
