export default function(
    logDate, logMessage, level, parent, leaves) {
  this.logDate = logDate
  this.logMessage = logMessage
  this.level = level
  this.parent = parent
  this.leaves = leaves
}
