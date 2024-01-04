// const WebVitals = require('./main.js')
// console.log(webvitals);
const scriptResources = performance
  .getEntries()
  .filter(
    (entry) =>
      entry.entryType === "resource" && entry.initiatorType === "script",
  );
  console.log(scriptResources);