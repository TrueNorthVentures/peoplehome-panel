var MongoClient = require('mongodb').MongoClient;
//var mongoClient = new MongoClient(new Server('localhost', 27017));
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = { address: "Park Lane 38" };
  db.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
    });