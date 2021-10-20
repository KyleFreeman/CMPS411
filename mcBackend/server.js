const express = require('express'); //Line 1
const cors = require('cors');
const multer = require('multer');
const { spawn } = require("child_process");
const fs = require('fs');
const userP = require('./userPass.json');
const { MongoClient } = require('mongodb');
const { GridFSBucket } = require('mongodb');
const { assert } = require('console');

const app = express(); //Line 2
const port = 3001; //Line 3

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());

const userPass = userP['username'] + ":" + userP['password'];

const uri = "mongodb+srv://" + userPass + "@micro-organisms.1kisu.mongodb.net/micro-organisms?retryWrites=true&w=majority"

const client = new MongoClient(uri);

try {
  client.connect();
  var db = client.db("micro-organisms").collection("micro-organisms");
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
      callback(null, 'public/');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});  

const upload = multer({storage: storage})

// app.post("/home", upload.single('file'), (req, res) => {
//     if (!req.file) {
//         res.sendStatus(500);
//     }
//     console.log(req.file);
// });

app.post("/upload", upload.single('file'), (req, res) => {
  var classified;
  var script = './CVClassifier/simple_test_model.py';
  var scriptImg = "./public/" + String(req.file.originalname);
  var dataset = '../../../dataset/EMDS5-Original'; 
  var predict = '--test';

  const python = spawn('python3', [script, scriptImg, dataset, predict]);
  python.stdout.on('data', function (data) {
    console.log("Pipe data from script...");
    classified = data.toString();
    if(predict == "--train") {
      console.log("Training Model. Please Wait!");
    }
    else {
      res.send(classified);
    }
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`Child Process closed with code ${code}`);
    console.log("Done");
  });

  // fs.createReadStream('./public/' + req.file.originalname).pipe(bucket.openUploadStream(req.file.originalname)).on('error', function(error) {assert.ifError(error);});
  
  // console.log(req.file.originalname);
});

app.get("/download/:name", (req, res) => {
  let fileName = req.params.name;
  console.log(fileName);
  bucket.openDownloadStreamByName(fileName).pipe(fs.createWriteStream('./public/' + fileName)).on('error', function(error) {
      assert.ifError(error);
      console.log("error");
    }).on('finish', function() {
      console.log('Done!');
    });
});

app.listen(port, () => console.log("Server is up"))