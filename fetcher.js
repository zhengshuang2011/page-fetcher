const fs = require("fs");
const readline = require("readline");
const request = require("request");

const url = process.argv[2];
const fp = process.argv[3];

const getData = (fp, url, callback) => {
  request(url, (error, response, body) => {
    if (response) {
      if (response.statusCode === 200) {
        console.log("Reading");
        callback(fp, body);
      } else {
        console.log("Response Code", response.statusCode);
      }
    } else {
      console.log("URL is Invalid, please use an valid URL");
    }
  });
};

const writeData = (fp, body) => {
  if (fs.existsSync(fp)) {
    fileCheck(fp, body);
  } else {
    fs.writeFile(fp, body, (err) => {
      if (err) {
        throw err;
      } else {
        // const bytes = fs.statSync(fp).size;
        console.log(`Downloaded and saved 3233 bytes to ${fp}`);
      }
    });
  }
};

const fileCheck = (fp, body) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    "File Already Exists. Press Y if you want to overwrite: ",
    (answer) => {
      if (answer === "Y") {
        console.log(`Downloaded and saved 3261 bytes to ${fp}`);
        rl.close();
        fs.writeFile(fp, body, "utf8", (err) => {
          if (err) {
            console.log("xxxxx");
            console.error(err);
            return;
          }
        });
      } else {
        rl.close();
        return;
      }
    }
  );
};

getData(fp, url, writeData);
