
// init project
var express = require('express');
var app = express();
var moment = require('moment');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const dburl = process.env.MONGO_URI;

let dbo;

MongoClient.connect(dburl, (err, db) => {
  if (err) throw err;
  dbo = db.db("lbf");
  dbo.createCollection("customers", (err, res) => {
    if (err) throw err;
    console.log("Collection created!");
    //db.close();
  });
  
});

//var faker = require('faker');
//var MongoClient = require('mongodb').MongoClient
//var assert = require('assert');
//const breeds = ["Labrador Retriever","Yorkshire Terrier","German Shepherd Dog","Golden Retriever","Beagle","Mastiff","Boxer","Dachshund","Poodle","Shih Tzu","Pugs","Boston Terrier","Miniature Pinscher","Bulldog","Miniature Schnauzer","Chihuahua","Pomeranian","Rottweiler","Cocker Spaniel","German Shorthaired Pointer","Maltese","Doberman Pinscher","Shetland Sheepdog","Pembroke Welsh Corgi","Great Dane","Siberian Husky","Brittany","Chinese Shar-Pei","West Highland White Terrier","Cavalier King Charles Spaniel","English Springer Spaniel","Bernese Mountain Dogs","Newfoundland","Weimaraner","Basset Hound","Bichon Frise","Australian Shepherd","French Bulldogs","Papillons","Havanese","Collie","Bloodhound","Saint Bernard","Bullmastiff","Scottish Terrier","Pekingese","Vizsla","Chesapeake Bay Retriever","var animals = faker.image.animals();errier","Lhasa Apso"]
//var Airtable = require('airtable');
//var base = new Airtable({apiKey: process.env.AT}).base(process.env.ATBASE);


// Connection URL

var rcd = [];

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {  
  
  response.sendFile(__dirname + '/views/index.html');


});

//opens schedules created by user
//I have no idea how to do this. :) 
//Challenge accepted. 
app.get("/schedules", function(req, res) {

  res.sendFile(__dirname + '/views/schedules.html');
  
})

app.post("/create_schedule", (req, res) => {
  
  //console.log("create_schedule heard with request body"); 
  
  const reqBody = req.body;
  
  //console.log("reqBody ", reqBody);
 
  let restructuredData = {
    contactInfo: {
      owner: reqBody.owner,
      phone: reqBody.phone,
      dog: reqBody.dog_name
    },
    schedule:{
      monday: reqBody.monday,
      tuesday: reqBody.tuesday,
      wednesday: reqBody.wednesday,
      thursday: reqBody.thursday,
      friday: reqBody.friday,
      saturday: reqBody.saturday,
      sunday: reqBody.sunday
    }
  }
  
  //console.log("restructuredData ", JSON.stringify(restructuredData));
  
  sendToDB(restructuredData);
  
  //It's not status it's sendStatus :) 
  //res.redirect("http://jacksdogwalking.me");

  res.status(200).send("<h3>Your pup has been scheduled</h3><p>Please close this window</p>");
         
});

app.get("/dogs_scheduled", (req, res) => {
  console.log("request ", req.body);
  pullFromDB();
  res.send(["blah"]);
})

function pullFromDB(){
  
  console.log("Trying to find DB collection");
    
  try{    
    dbo.collection.find()
  }catch(e){
    console.log("error finding db records and documents");  
  }
  
}

function sendToDB(payload){

  //console.log("body of sendToAT ", body);
  
  dbo.collection("customers").insertOne(payload, (err, res) => {

    if (err) throw err;
    
    console.log("document inserted");
    
    dbo.close();
    
  })
  
};


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
