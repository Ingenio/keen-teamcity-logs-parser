import fs from 'fs';
import readline from 'readline';
import LogEntry from 'log-entry';

const regex = /^\[(\d{2}:\d{2}:\d{2})\][ |\w]:(\t*)(.*)$/;

const parseLine = (logLine) => {

  const result = logLine.match(regex);
  if(result) {
    const logDate = result[1];
    const tabs = result[2];
    const message = result[3];
    let level = 0;
    if(tabs && tabs.length > 0){
      level = tabs.length;
    }
    return new LogEntry(logDate, message, level);
  }

  return null;
};

const parser = (filePath, callBack) => {
  //TODO: read file and parse each line
  console.log(readline);
  //return;
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  });

  lineReader.on('line', (line) => {
    callBack(parseLine(line));
  });

};

export {
  parser
};
