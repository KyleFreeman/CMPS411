const express = require('express'); //Line 1
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { spawn } = require("child_process");
const fs = require('fs');
const userP = require('./userPass.json');
const { MongoClient } = require('mongodb');
const { GridFSBucket } = require('mongodb');
const { assert } = require('console');

const app = express(); //Line 2
const port = 3001; //Line 3

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/SubGalImages'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());

const userPass = userP['username'] + ":" + userP['password'];

const uri = "mongodb+srv://" + userPass + "@micro-organisms.1kisu.mongodb.net/micro-organisms?retryWrites=true&w=majority"

const client = new MongoClient(uri);

try {
  client.connect();
  console.log("Database Connected");
}
catch {
  console.log("Error");
}

const bucket = new GridFSBucket(client.db("micro-organisms"));

app.get("/home", (req,res) => {
    res.send("Express is connected")
})

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'ImageUpload/');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});  

const upload = multer({storage: storage})

// app.post("/db", (req, res) => {
//   fs.createReadStream(req.body.pathname).pipe(bucket.openUploadStream(req.body.filename, {metadata: {classification : req.body.classname}})).on('error', function(error) {assert.ifError(error);});
//   res.send("Image Uploaded");
// })

app.post("/upload", upload.single('file'), (req, res) => {
  var classified;
  var fileName = req.file.originalname;
  var script = './CVClassifier/simple_test_model.py';
  var file = "--file";
  var scriptImg = `./ImageUpload/${fileName}`;
  var dataset = '../../../dataset/EMDS5-Original'; 
  var predict = '--test';

  const python3 = spawn('python3', [script, dataset, file, scriptImg, predict]);
  python3.stdout.on('data', function (data) {
    console.log("Pipe data from script...");
    classified = data.toString();
    if(predict == "--train") {
      console.log("Training Model. Please Wait!");
    }
    else {
      res.send(classified);
      const splitName = classified.split(/(\s+)/);
      console.log(splitName[2]);
      fs.createReadStream('./ImageUpload/' + req.file.originalname).pipe(bucket.openUploadStream(req.file.originalname, {metadata: {classification : splitName[2]}})).on('error', function(error) {assert.ifError(error);});
    }
  });

  python3.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python3.on('close', (code) => {
    console.log(`Child Process closed with code ${code}`);
    console.log("Done");
  });

});

app.post("/train", (req, res) => {
  var script = './CVClassifier/simple_test_model.py';
  var dataset = '../../../dataset/EMDS5-Original'; 
  var predict = '--train';

  const python3 = spawn('python3', [script, dataset, predict]);
  python3.stdout.on('data', function (data) {
    console.log("Pipe data from script...");
  });

  python3.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python3.on('close', (code) => {
    console.log(`Child Process closed with code ${code}`);
    console.log("Done");
    res.send("Model Trained");
  });
});

app.get("/download/:name", (req, res) => {

  const DLcleanup = spawn('python3', ["./ImageCleanup/cleanup.py", "./public/"]);
  
  const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

  sleep(1000).then(() => {
    DLcleanup.stdout.on('data', function (dlOut) {
      console.log(dlOut.toString());
    });
  });
  
  let queryString = req.params.name;

  client.db("micro-organisms").collection("fs.files").find({metadata : {classification : queryString}}).toArray(function(err, result) {
    if (err) throw err;
    if (result.length == 0) {
      var noReturn = ["none"];
      res.send(noReturn);
    }
    else {
      Promise.all(result.slice(0,19).map((image) => {
        bucket.openDownloadStreamByName(image.filename).pipe(fs.createWriteStream('./public/' + image.filename)).on('error', function (error) {
          assert.ifError(error);
          console.log("error");
        }).on('finish', function () {
          console.log(image.filename);
        });
        
        return image.filename;
  
      })).then((result) => {
        setTimeout((() => {
          console.log(result);
          res.send(result);
        }), 4000);
      });
    }
  });
});

app.get("/subGallery/:name", (req, res) => {

  const DLcleanup = spawn('python3', ["./ImageCleanup/cleanup.py", "./SubGalImages/"]);
  
  const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

  sleep(1000).then(() => {
    DLcleanup.stdout.on('data', function (dlOut) {
      console.log(dlOut.toString());
    });
  });
  
  let queryString = req.params.name;

  client.db("micro-organisms").collection("fs.files").find({metadata : {classification : queryString}}).toArray(function(err, result) {
    if (err) throw err;
    if (result.length == 0) {
      var noReturn = ["none"];
      res.send(noReturn);
    }
    else {
      Promise.all(result.slice(0,4).map((image) => {
        bucket.openDownloadStreamByName(image.filename).pipe(fs.createWriteStream('./SubGalImages/' + image.filename)).on('error', function (error) {
          assert.ifError(error);
          console.log("error");
        }).on('finish', function () {
          console.log(image.filename);
        });
        
        return image.filename;
  
      })).then((result) => {
        setTimeout((() => {
          console.log(result);
          res.send(result);
        }), 2000);
      });
    }
  });
});

app.get("/result/:name", (req, res) => {
  var fileName = req.params.name;
  let fileLocation = path.join('/ImageUpload/' , String(fileName));
  res.sendFile(`${fileLocation}`, { root : __dirname})

  const cleanup = spawn('python3', ["./ImageCleanup/cleanup.py", "./ImageUpload/"]);
  cleanup.stdout.on('out', function (out) {
    console.log(out.toString());
  });
});

app.listen(port, () => console.log("Server is up"))