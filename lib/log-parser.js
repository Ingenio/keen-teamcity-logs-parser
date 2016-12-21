

const regex = /^\[(\d{2}:\d{2}:\d{2})\][ |\w]:(\t*)(.*)$/;

const parseLine = (logLine) => {

  const result = logLine.match(regex);

  const logDate = result[1];
  const tabs = result[2];
  const message = result[3];

  return {logDate, tabs, message};
};

const parser = (filePath) => {
  //TODO: read file and parse each line
};

export {
  parseLine
}
