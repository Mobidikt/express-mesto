const fsPromises = require("fs").promises;

return fsPromises.readFile(pathUrl, { encoding: "utf8" }).then((file) => {
  return JSON.parse(file);
});
