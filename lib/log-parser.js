import fs from 'fs';
import readline from 'readline';

const regex = /^\[(\d{2}:\d{2}:\d{2})\][ |\w]:(\t*)(.*)$/;

const parseLine = (logLine) => {

  const result = logLine.match(regex);
  if(result) {
    const logDate = result[1];
    const tabs = result[2];
    const message = result[3];
    return {logDate, tabs, message};
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
}
