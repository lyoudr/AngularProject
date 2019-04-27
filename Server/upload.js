const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const url = 'mongodb://localhost:27017/myproject';
const MongoClient = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  let readStream;
  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.name
    console.log('file.name =>', file.name);
    //readStream = fs.createReadStream(file.path);
    MongoClient.connect(url, (err, db) => {
      if(err){
        console.log('Connection failed');
      } else {
        console.log('Connection success');
        let data = fs.readFileSync(file.path);
        let insertdata = {};
        insertdata.filedata = Binary(data);
        //db.collection('pictures').insert(insertdata);

        //Find out the data we've inserted;
        db.collection('pictures').find({}).toArray(function (err, documents) {
          if (err) {
            console.error(err);
          } else {
            console.log('Founded picture is =>',documents[0].filedata.buffer);
            let img = new Buffer.from(documents[0].filedata.buffer).toString('base64');
            console.log('img is =>', img);
            res.write(img);
            res.end();
          }
        });
      }
    });
  });
  form.parse(req);
};