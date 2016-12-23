export default function(
    logDate, logMessage, level, parentNode, leaves) {
  this.logDate = logDate
  this.logMessage = logMessage
  this.level = level
  this.parentNode = parentNode
  this.leaves = leaves
}
