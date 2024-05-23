import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile-picture", function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "user-account";

app.post("/update-profile", function (req, res) {
  let userObj = req.body;

  MongoClient.connect(
    mongoUrlLocal,
    mongoClientOptions,
    function (err, client) {
      if (err) throw err;

      let db = client.db(databaseName);
      userObj["userid"] = 1;

      let myquery = { userid: 1 };
      let newvalues = { $set: userObj };

      db.collection("users").updateOne(
        myquery,
        newvalues,
        { upsert: true },
        function (err, res) {
            if (err) throw err;
            console.log('successfully updated')
            client.close();
            res.send(userObj)
        }
      );
    }
  );
  // Send response
  res.send(userObj);
});

app.get("/get-profile", function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(
    mongoUrlLocal,
    mongoClientOptions,
    function (err, client) {
      if (err) throw err;

      let db = client.db(databaseName);

      let myquery = { userid: 1 };

      db.collection("users").findOne(myquery, function (err, result) {
        if (err) throw err;
        response = result;
        client.close();

        // Send response
        res.send(response ? response : {});
      });
    }
  );
});

// app.listen(3000, function () {
//   console.log("app listening on port 3000!");
// });
// const users = await findUser('something');
// console.log(users);




// const quicksort = (arr) => {
//     if (arr.length <= 1) {
//         return arr;
//     }
//     const pivot = arr[Math.floor(arr.length / 2)]
//     const left = [];
//     const right = [];

//     for (let i = 0; i < arr.lenght; i++){
//         if (arr[i] < pivot) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }

//     return [...quicksort(left), pivot, ...quicksort(right)]

// }

// const mergeArr = (left, right) => {
//     const result = []




// }

// const mergeSort = (arr) => {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     const mid = Math.floor(arr.length / 2);

//     const left = arr.slice(0, mid)
//     const right = arr.slice(mid)

//     return mergeArr(mergeSort(left), mergeSort(right))


// }