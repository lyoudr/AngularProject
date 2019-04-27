const express = require('express');
const server = express();
const cors = require('cors');
const fs = require('fs');
const Accountlist = require('./account.js');
const Stores = require('./store.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const upload = require('./upload');

/* Allow bodyParser */
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
/* allow CORS */
server.use(cors());

/* Static Files */
server.use(express.static('../FrontEnd/dist'));

/* Server */
server.listen(3000, () => { console.log('Server started!'); });

/* Generate token */
class HandlerGenerator {
    login (req, res) {
      let username = req.body.username;
      let password = req.body.password;
      // For the given username fetch user from DB
      let mockedUsername = 'Ann';
      let mockedPassword = '123456';
  
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username, password : password},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    index (req, res, next) {
      res.json({
        success: true,
        message: 'Index page'
      });
      next();
    }
}

// Starting point of the server
let handlers = new HandlerGenerator();
// Routes & Handlers
server.post('/login', handlers.login);
//server.get('/', middleware.checkToken, handlers.index);
   
/* API Routing */
/* 1. Account */
/* index.html */
server.get('/', (req, res) => {
    fs.readFile('../FrontEnd/dist/index.html', function (err, data) { 
      res.write(data);
      res.end();
    });
});

/*Get Account*/
server.get('/accountlist', middleware.checkToken, (req, res) => {
    var page = req.query.page;
    console.log('Recevied request!');
    console.log('page is =>',page);
    if (page == 1){
        res.json(Accountlist.accountlist1)
    } else if (page == 2) {
        res.json(Accountlist.accountlist2)
    } else if (page == 3) {
        res.json(Accountlist.accountlist3)
    }
    res.end();
});

/*Account information*/
server.get('/getUserInfo', middleware.checkToken, (req, res) =>{
    var account = req.query.account;
    console.log('account is =>', account);
    if (account == "A01") {
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "A1536",
                createTime: "2018.09.21",
                name: "Amy",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "amyaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "A02") {
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "B1536",
                createTime: "2018.09.21",
                name: "Bob",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "bobaccount",
                email: "abc@gmail.com",
                status: "不正常"
            }
        })
    } else if (account == "A03"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "B01"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "B02"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "B03"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "C01"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "C02"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    } else if (account == "C03"){
        res.json({
            result: {
                birthday: "1993.09.04",
                accountId: "C1536",
                createTime: "2018.09.21",
                name: "Tom",
                auditStatus: "pass",
                createdTime: "2018.01.15",
                idNumber: "abcd",
                account: "tomaccount",
                email: "abc@gmail.com",
                status: "正常"
            }
        })
    }
});

/*Search Account*/
server.get('/searchaccount', middleware.checkToken, (req, res) =>{
    console.log("得到 search account 的 request");
    res.json([
        { created_time: "2019.08.12", account:"A01", name: "Amy", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"A02", name: "Tom", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"A03", name: "Bob", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"B01", name: "Json", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"B02", name: "Jay", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"B03", name: "Bruce", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"C01", name: "Alice", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"C02", name: "Joicy", email:"abc@gmail.com", status:"正常" },
        { created_time: "2019.08.12", account:"C03", name: "Fred", email:"abc@gmail.com", status:"正常" }    
    ]);
    res.end();
});
/* Account Coin */
server.get('/getCoin', middleware.checkToken, (req, res) =>{
    var account = req.query.account;
    console.log('account is =>', account);
    if (account == "A01") {
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "A02") {
        res.json([
            { sName: "ETH", balance: "0.68" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "A03"){
        res.json([
            { sName: "BCT", balance: "0.72" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "B01"){
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "B02"){
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "B03"){
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "C01"){
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "C02"){
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    } else if (account == "C03"){
        res.json([
            { sName: "ETH", balance: "0.53" },{ sName: "ABC", balance: "3.98" }
        ])
    }
})
/* 2. Store*/
/* Getstores */
server.get('/storeInfo', middleware.checkToken, (req, res) =>{
    let page = req.query.page;
    if(page == 1) {
        res.json(Stores.store1)
    } else if (page == 2){
        res.json(Stores.store2)
    } else if (page == 3) {
        res.json(Stores.store3)
    }
    res.end();
});

/* Add Stores */
server.post('/register', middleware.checkToken, (req, res)=>{
    let received = req.body;
    console.log('body is =>', received);
    res.send({
        status: "SUCCESS"
    })
});

/* Search Stores */
server.get('/searchstores', middleware.checkToken, (req, res)=>{
    res.json([
        {
            name:"好美超市",
            taxId: "123456",
            chargename: "王小明",
            contactperson:"王大美",
            chargestatus: "已授權",
            moneystatus: "未出金",
            storeCid:"A123"
        },
        {
            name:"棒棒超市",
            taxId: "654321",
            chargename: "陳大大",
            contactperson:"陳小小",
            chargestatus: "已授權",
            moneystatus: "未出金",
            storeCid:"B123"
        },
        {
            name:"嗨嗨超市",
            taxId: "223344",
            chargename: "林大大",
            contactperson:"林小小",
            chargestatus: "已授權",
            moneystatus: "已出金",
            storeCid:"C123"
        },
        {
            name:"笨笨超市",
            taxId: "123654",
            chargename: "方大大",
            contactperson:"方小小",
            chargestatus: "未授權",
            moneystatus: "未出金",
            storeCid:"D123"    
        },
        {
            name:"喜樂超市",
            taxId: "098765",
            chargename: "汪大大",
            contactperson:"汪小小",
            chargestatus: "已授權",
            moneystatus: "已出金",
            storeCid:"E123"
        },
        {
            name:"天空超市",
            taxId: "564783",
            chargename: "蔡想想",
            contactperson:"蔡不想",
            chargestatus: "已授權",
            moneystatus: "未出金",
            storeCid:"F123"
        },
        {
            name:"天兵超市",
            taxId: "464390",
            chargename: "羅宋送",
            contactperson:"羅小小",
            chargestatus: "未授權",
            moneystatus: "未出金",
            storeCid:"G123"    
        },
        {
            name:"全天超市",
            taxId: "463820",
            chargename: "周笨笨",
            contactperson:"周大大",
            chargestatus: "已授權",
            moneystatus: "已出金",
            storeCid:"I123"
        },
        {
            name:"哈摟超市",
            taxId: "474630",
            chargename: "嗨嗨嗨",
            contactperson:"嘿嘿嘿",
            chargestatus: "未授權",
            moneystatus: "未出金",
            storeCid:"J123"
        }
    ]);
    res.end();
})

/*3. Discussions */

/* Connection URL */
var url = 'mongodb://localhost:27017/myproject';

/* Method */
//(1) Insert a Document
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('classicinfo');
  // Insert some documents
  collection.insertMany({},function(err, result) {
      assert.equal(err, null);
      assert.equal(9, result.result.n);
      assert.equal(9, result.ops.length);
      console.log("result is=>", result);
      console.log("Inserted 3 documents into the collection");
      callback(result);
  });
}
//(2) Remove a Document
var removeDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('classicinfo');
  // Delete document where a is 3
  collection.deleteMany({}, function(err, result) {
    assert.equal(err, null);
    //assert.equal(1, result.result.n);
    console.log("Removed all the document");
    callback(result);
  });    
}
//(3) Find Document
var findDocuments = function(db,callback) {
  // Get the documents collection
  var collection = db.collection('classicinfo');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('docs is =>',docs);
    callback(docs);
  });
}
//(4) Update Document (add new field to each collection)
let updateDocuments = async function(db,  callback){
    await db.collection('classicinfo').update(
        {},
        { $set: { "goodcount": 0 } },
        { upsert: false,
          multi: true }
    );
    console.log('comments had been added to this post!!');
    callback();
}

//(5) Update Document (push data to each field (array))
let pushDocuments = async function(db, id, replaycomment, callback){
    await db.collection('classicinfo').update(
        { _id: ObjectID(`${id}`) },
        { $push: { comments : `${ replaycomment }`}}
    );
    console.log('comments had been added to this post!!');
    callback();
}

/* Connect to MogoDB Database */  
// I. 確認連接到 MongoDB，並且 return "db";
let getDBInstance = async(db_url) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(db_url, (err, db) => {
            // check connection
            if(err) {
                reject(undefined);  
            } // fi
            resolve(db);
        });
    })
    .catch(error => console.log('caught error is =>', error));
}; // end of getDBInstance
// II. 將上述回傳的 "db" 送入此 function，並呼叫 'getDataFromCollection()'
let GetData = async (dbInstance, collectionName) => {
    return await getDataFromCollection(dbInstance, collectionName);
};
//III. 以傳入的 "db" 和 "collection" 去尋找需要的 collection，並回傳結果
let getDataFromCollection = async(db, collection) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({}).toArray((err, result) => {
            if(err) {
                reject(undefined);
            } // fi
            resolve(result); 
        });
    })
    .catch(error => console.log('caught error is =>', error));
}; // end of getDataFromCollection

/*3.1 Classic */
server.get('/classicDiscuss', middleware.checkToken, async (req, res) =>{
    let page = req.query.page;
    if(page == 1){
        let dbInstance = await getDBInstance(url);
        console.log('dbInstance is =>', dbInstance);
        let result = await GetData(dbInstance, 'classicinfo');
        console.log('結果是 =>', result[0].theme);
        res.json(result);
    res.json()
    } else if (page == 2){
        return res.json(Stores.store2)
    } else if (page == 3) {
        return res.json(Stores.store3)
    }
    res.end();
}); 

/*3.2 Classic Information */
server.get('/classicInfo', middleware.checkToken, async (req, res) =>{
    let id = req.query.id;
    let dbInstance = await getDBInstance(url);
    let result = await GetData(dbInstance, 'classicinfo');
    if(id == '5c9c28185b02ca014a81ec16'){
        res.json({title: result[8].theme , content: result[8].content, comments: result[8].comments, id: result[8]._id});
    } else if (id == '5c9c28185b02ca014a81ec17') {
        res.json({title: result[1].theme , content: result[1].content, comments: result[1].comments, id: result[1]._id});
    } else if (id == '5c9c28185b02ca014a81ec18') {
        res.json({title: result[0].theme , content: result[0].content, comments: result[0].comments, id: result[0]._id});
    } else if (id == '5c9c28185b02ca014a81ec19') {
        res.json({title:result[2].theme, content: result[2].content, comments: result[2].comments, id: result[2]._id});
    } else if (id == '5c9c28185b02ca014a81ec1a') {
        res.json({title:result[5].theme, content: result[5].content, comments: result[5].comments, id: result[5]._id});
    } else if (id == '5c9c28185b02ca014a81ec1b') {
        res.json({title:result[4].theme, content: result[4].content, comments: result[4].comments, id: result[4]._id});
    } else if (id == '5c9c28185b02ca014a81ec1c') {
        res.json({title:result[3].theme, content: result[3].content, comments: result[3].comments, id: result[3]._id});
    } else if (id == '5c9c28185b02ca014a81ec1d') {
        res.json({title:result[7].theme, content: result[7].content, comments: result[7].comments, id: result[7]._id});
    } else if (id == '5c9c28185b02ca014a81ec1e') {
        res.json({title:result[6].theme, content: result[8].content, comments: result[8].comments, id: result[8]._id});
    } else if (id == '5ca0607648c68a039e343eec') {
        res.json({title:result[10].theme, content: result[10].content, comments: result[10].comments, id: result[10]._id});
    } else if (id == '5cb70447a47150095d0b654b') {
        res.json({title:result[11].theme, content: result[11].content, comments: result[11].comments, id: result[11]._id});
    } else if (id == '5cb7084f2595af098238c1bd') {
        res.json({title:result[12].theme, content: result[12].content, comments: result[12].comments, id: result[12]._id});
    }
});

/*3.3 Classic Post */
server.post('/classic/submitform', middleware.checkToken, (req, res) => {
    console.log('新增的貼文是 =>',req.body); 
    var insertsingleDoc = function(db, callback) {
        db.collection('classicinfo').insertOne(
            req.body, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            callback(result);
            }
        );
    }
    //(4) Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        /* 刪除某個 field from all documents */
        /*db.collection('classicinfo').update(
            { $unset: { index :""} } , 
            { multi: true }
        );*/
        insertsingleDoc(db, function() {
            findDocuments(db, function() {
            db.close();
            });
        });
    });
    res.json({status: "ok", text: "have written to database"});
});

/*3.4 Add new Comments to each Post*/
server.post('/classic/comments', middleware.checkToken, (req, res) =>{
    console.log('新增的回覆是 =>',req.body);
    let replayid = req.body.id;
    let replaycomment = req.body.comment;
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log('dbInstance is =>', db);
        pushDocuments(db, replayid, replaycomment, function(){
            console.log('replayid', replayid);
            findDocuments(db, function() {
                console.log('closed');
                db.close();
            });
        });
    });
    res.json({status: "ok", text: "add a new comment to the post"});
    res.end();
});

/*3.5 Add good to each Post*/
server.put('/classic/good', middleware.checkToken, (req, res) =>{
    console.log('按讚是 =>', req.body);
    let id = req.body.index;
    let goodcount = req.body.goodcount;
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        /*將某個 field 的 value 從 string 轉成 number*/
        /*db.collection('classicinfo').find({}).forEach(function(data){
            db.collection('classicinfo').update(
                { "_id": data._id }, 
                { $set: { "good": parseInt(data.good)}
            });
        });*/
        //Modify the good status (good or bad)
        db.collection('classicinfo').updateOne(
            { _id: ObjectID(`${id}`) },
            { $set: { "goodcount" : `${goodcount}` } },
        );
        //Modify the good counts 
        db.collection('classicinfo').update(
            { _id: ObjectID(`${id}`) },
            { $inc: { "good": goodcount} }
        );
        //Find all data
        db.collection('classicinfo').find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log('docs is =>',docs);
            db.close();
        });
    });
    res.json({status: "ok", msg : "I've received your good!"});
    res.end();
});

/* 4. Restaurant */
/* 4.1 Get Restaurant */
server.get('/restaurantlists', middleware.checkToken, (req, res) =>{
    let page = req.query.page;
    let classification = req.query.classification;
    console.log('classification', classification);
    if(classification == "sweet") {
        if ( page == 1) {
            res.json([
                { name : "咚咚餐廳", price : "100 ~ 200 TWD", comment: "好吃甜甜的", img : "assets/img/restaurant/restaurant-1.jpg", id : "01" },
                { name : "哈摟餐廳", price : "300 ~ 600 TWD", comment: "好棒", img : "assets/img/restaurant/restaurant-2.jpg", id : "02" },
                { name : "每每餐廳", price : "600 ~ 944 TWD", comment : "吃起來不錯", img : "assets/img/restaurant/restaurant-3.jpg", id : "03"},
                { name : "美麗餐廳", price : "500 ~ 1200 TWD", comment : "一定要來吃", img : "assets/img/restaurant/restaurant-4.jpg", id : "04" }
            ])
            console.log('sweet');
        }
    } else if (classification == "righteous") {
        if ( page == 1) {
            res.json([
                { name : "義大餐廳", price : "400 ~ 700 TWD", comment: "好吃鹹鹹的", img : "assets/img/restaurant/restaurant-1.jpg", id : "05" },
                { name : "樂樂餐廳", price : "500 ~ 600 TWD", comment: "有很多生菜, 不好吃", img : "assets/img/restaurant/restaurant-2.jpg", id : "06" },
                { name : "您好餐廳", price : "600 ~ 900 TWD", comment : "我喜歡它的米飯", img : "assets/img/restaurant/restaurant-3.jpg", id : "07" },
                { name : "安安餐廳", price : "500 ~ 800 TWD", comment : "義大利麵好吃", img : "assets/img/restaurant/restaurant-4.jpg", id : "08" }
            ])
            console.log('righteous');
        }
    } else if (classification == "chinese") {
        if ( page == 1) {
            res.json([
                { name : "武道餐廳", price : "304 ~ 850 TWD", comment: "很有中國味", img : "assets/img/restaurant/restaurant-1.jpg", id : "09" },
                { name : "湯包餐廳", price : "100 ~ 220 TWD", comment: "湯包好吃", img : "assets/img/restaurant/restaurant-2.jpg", id : "10" },
                { name : "享用餐廳", price : "230 ~ 340 TWD", comment : "吃起來不錯", img : "assets/img/restaurant/restaurant-3.jpg", id : "11" },
                { name : "素菜餐廳", price : "800 ~ 1000 TWD", comment : "菜菜好吃喔", img : "assets/img/restaurant/restaurant-4.jpg", id : "12" }
            ])
            console.log('chinese');
        }
    }
});

/*4.2 Upload Imgaes about restaurants */
server.post('/postimages', upload);

/*4.3 Post Big Data to FrontEnd */
server.get('/getbigdata',middleware.checkToken, (req, res) => {
    res.json(
        {"result":{"limit":1000,"offset":0,"count":138,"sort":"","results":[{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/esut.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_507_6894974_56101.jpg","o_tlc_agency_address":"臺北市中正區公園路29號","o_tlc_agency_phone":"(02)2311-0395","o_tlc_agency_purpose":"培育文采有品 領袖群倫的附小兒 (一)倡導前瞻的領導理念，落實推動教育政策。 (二)建立專業的領導團隊，發揮組織整體效能。  (三)重視系統的領導歷程，提升教育全面品質。  (四)展現卓越的領導績效，創造教育永續發展。","o_tlc_agency_email":"http:\/\/web.estmue.tp.edu.tw\/php\/email.php\/%E6%96%B9%E6%85%A7%E7%90%B4","o_tlc_agency_name":"臺北市立大學附設實驗國民小學","o_tlc_agency_fax":"(02)2331-0319","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"教育7~12歲幼童","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_507_4406609_56101.jpg","_id":1,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"平日：0730～1700假日：0800～1600","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tmps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_508_6117032_55581.jpg","o_tlc_agency_address":"臺北市中正區仁愛路1段2之4號","o_tlc_agency_phone":"(02)2341-2822","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中正區東門國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_508_1937618_55581.jpg","_id":2,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ches.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市中正區忠孝東路2段101號","o_tlc_agency_phone":"(02)2391-8170","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中正區忠孝國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":3,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.nmes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_510_2284290_84049.jpg","o_tlc_agency_address":"臺北市中正區廣州街6號","o_tlc_agency_phone":"(02)2371-5052","o_tlc_agency_purpose":"學校以發展快樂校園、健康校園、實力校園為學生學習課程的重點學校。","o_tlc_agency_email":"nanmem@mail.nmes.tp.edu.tw","o_tlc_agency_name":"臺北市中正區南門國民小學","o_tlc_agency_fax":"(02)2331-7822","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"南門國小學生及家長相關之所有業務","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_510_6027268_65699.jpg","_id":4,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"8點至16點","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.meps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_511_3945988_96172.jpg","o_tlc_agency_address":"臺北市中正區南海路58號","o_tlc_agency_phone":"(02)2303-3555","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市國語實驗國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_511_395729_96172.jpg","_id":5,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.cips.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_512_3498379_69936.jpg","o_tlc_agency_address":"臺北市中正區中華路2段307巷17號","o_tlc_agency_phone":"(02)2303-8752","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中正區忠義國民小學","o_tlc_agency_fax":"(02)2305-9501","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_512_1157498_69936.jpg","_id":6,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yces.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_513_5851221_58038.jpg","o_tlc_agency_address":"臺北市中正區詔安街29號","o_tlc_agency_phone":"(02)2305-4620","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中正區螢橋國民小學","o_tlc_agency_fax":"(02)2309-5753","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_513_2890092_58038.jpg","_id":7,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.fuanps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區延平北路8段135號","o_tlc_agency_phone":"(02)2810-0041","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區富安國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":83,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.htps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_514_8341245_90464.jpg","o_tlc_agency_address":"臺北市中正區汀州路二段180號","o_tlc_agency_phone":"（02）23677144","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中正區河堤國民小學","o_tlc_agency_fax":"（02）2368-5438","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_514_6133145_91019.jpg","_id":8,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"11"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/web.tpes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_515_1010338_62233.jpg","o_tlc_agency_address":"臺北市大同區延平北路2段239號","o_tlc_agency_phone":"(02)2553-2229","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區太平國民小學","o_tlc_agency_fax":"(02)2557-5746","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_515_5848674_62233.jpg","_id":9,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"每週一~日 05:00~07:00每週一~五 16:30~20:00","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ylps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_516_5921303_21937.jpg","o_tlc_agency_address":"臺北市大同區延平北路2段266號","o_tlc_agency_phone":"(02)2553-4882#103","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區永樂國民小學","o_tlc_agency_fax":"(02)2550-6756","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_516_234192_21937.jpg","_id":10,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.zhps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_517_1938551_08394.jpg","o_tlc_agency_address":"臺北市大同區太原路151號","o_tlc_agency_phone":"(02)2558-4819","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區日新國民小學","o_tlc_agency_fax":"(02)2556-4092","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_517_2616960_08394.jpg","_id":11,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.plps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_518_3299801_57262.jpg","o_tlc_agency_address":"臺北市大同區寧夏路35號","o_tlc_agency_phone":"(02)2556-9835","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區蓬萊國民小學","o_tlc_agency_fax":"(02)2555-2055","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_518_8236390_57262.jpg","_id":12,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"戶外運動場、籃球場、戶外體適能區、遊戲區、戶外歷史步道區(白天) 平日、寒暑假 05:30~07:00 例、假日 05:30~19:00戶外運動場、籃球場、戶外體適能區、遊戲區、戶外歷史步道區(夜間)星期二、四、六、日 19:00~21:00","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tjps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_519_5748228_57052.jpg","o_tlc_agency_address":"臺北市大同區重慶北路3段2號","o_tlc_agency_phone":"(02)2594-4413","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區大橋國民小學","o_tlc_agency_fax":"(02)2595-2481","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_519_1920089_95285.jpg","_id":13,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.sles.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_520_8298211_16040.png","o_tlc_agency_address":"臺北市大同區錦西街51號","o_tlc_agency_phone":"(02)2557-0309","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區雙蓮國民小學","o_tlc_agency_fax":"(02)2553-4840","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_520_8183417_44633.jpg","_id":14,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tlps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_568_2971185_16393.jpg","o_tlc_agency_address":"臺北市萬華區艋舺大道389號","o_tlc_agency_phone":"(02)2306-4311","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區大理國民小學","o_tlc_agency_fax":"(02)2304-2393","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_568_3084875_16393.jpg","_id":54,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ttps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_521_2033006_75185.jpg","o_tlc_agency_address":"臺北市大同區大龍街51號","o_tlc_agency_phone":"(02)2596-5407","o_tlc_agency_purpose":"","o_tlc_agency_email":"chichi@tp.edu.tw","o_tlc_agency_name":"臺北市大同區大同國民小學","o_tlc_agency_fax":"(02)2585-0281","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_521_3527629_75046.jpg","_id":15,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"校園開放時間：週一到週五：05:00-07:00     17:30-21:30週六、日：05:00-21:30","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.dlps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_523_4097293_80411.jpg","o_tlc_agency_address":"臺北市大同區哈密街47號","o_tlc_agency_phone":"(02)2594-2635","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區大龍國民小學","o_tlc_agency_fax":"(02)2585-0245","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_523_8057559_80466.jpg","_id":16,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ypps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_524_3369443_75628.jpg","o_tlc_agency_address":"臺北市大同區昌吉街97號","o_tlc_agency_phone":"(02)2594-2439","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大同區延平國民小學","o_tlc_agency_fax":"(02)2585-0485","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_524_2995021_75677.jpg","_id":17,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"5"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.csps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_525_6595619_84389.jpg","o_tlc_agency_address":"臺北市中山區民權東路1段69號","o_tlc_agency_phone":"(02)2591-4085","o_tlc_agency_purpose":"一、積極做全方位努力，使中山成為優質學校。校長榮獲96年教育部校長領導卓越獎及96學年優質學校校長領導獎，理念明確，能帶領學校加速走向進步發展。二、建立現代化企業化的行政管理，以「e化管理」為主軸，統整知識管理、品質管理、績效管理的行政體制，榮獲97學年度優質學校行政管理向度之獎項。 三、重視教師教學品質，已連續三年推動「教師專業發展評鑑」及「教學輔導老師」機制，而通過「發展性教學輔導系統初階」之教師達117人，通過高階的達29人，大幅提昇本校的教師素質，進而提昇教師之教學品質，成為台北市試辦教師專業發展評鑑的領頭羊。 四、注重學生之品德教育，大力推展「友善校園」計畫，並自行設計品德教育學習單，結合綜合課程，實施品德教育。 五、本校為特殊教育之重點學校，設有自足式特教班7班，身障資源班3班，資優資源班3班。除注重學生之發展外，並與各教育大學合作，提供實習機會，培育未來的特教教師。 六、本校重視對學生的生活照顧，除協助辦理政府或民間單位之補助外，本校成立了「仁愛基金」、「健保補助金」、「清寒獎助金」、「特教清寒課後基金」、「特教愛心基金」等六項基金，教師及積極關懷學生，發現生活有困難者，即時提出申請並儘速給予所需的協助。 七、本校夜補校有二十年歷史 ，目前有七班，重點在加強新移民及失學民眾之國語文與常識教學，自97學年度起更開設電腦課，帶領民眾邁向e化的時代。 八、以體育為學校發展重點項目，發展網球籃球羽球足球之體育綜合團隊；成立體育班四班，加強體育專長學生之訓練，陪養國家的種子人才。 九、加強國語文、數學、資訊等工具學科之教學；加強視覺藝術、音樂教育、社團活動等課程，本校口琴樂團遠近馳名，有二十五年歷史；網球隊已於北市比賽獲27連霸；足球、羽球、籃 球等也急起直追嶄露頭角。十、著重學校文化改造、社會資源統整、校園總體營造之進行，97年完成優質化工程及專科教室精進方案。","o_tlc_agency_email":"case@csps.tp.edu.tw","o_tlc_agency_name":"臺北市中山區中山國民小學","o_tlc_agency_fax":"(02)2592-9964","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"小學教育、成人補校","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_525_4228225_84335.jpg","_id":18,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"7：00-18：00","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.caps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_526_7193173_11052.jpg","o_tlc_agency_address":"臺北市中山區吉林路15號","o_tlc_agency_phone":"(02)2561-7600","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中山區長安國民小學","o_tlc_agency_fax":"(02)2521-1589","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_526_9872854_11052.jpg","_id":19,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.clps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_527_8613605_51065.jpg","o_tlc_agency_address":"臺北市中山區長春路116號","o_tlc_agency_phone":"(02)2521-9196","o_tlc_agency_purpose":"1.　以學生為中心以愛為出發點。2.　以教學為首要提升教學效能。3.　實施多元教學推展多元評量。4.　充實圖書資訊豐富教學專業。5.　營造創意校園強化潛在課程。6.　課程教學領導發揮教學專業。7.　建立學習組織優化學習風氣。8.　推展多元團隊成就多元明星。9.　合宜輔導體制帶好每位兒童。10.　強化特殊教育提供適切學習。11.　活潑幼稚教育快樂健康成長。12.　人性領導經營創發團體動力。13.　合宜公共關係廣納社會資源。14.　推展家庭教育父母多元成長。15.　開放學校場地學校社區融合。","o_tlc_agency_email":"lotus@tp.edu.tw","o_tlc_agency_name":"臺北市中山區吉林國民小學","o_tlc_agency_fax":"(02)2561-8868","o_tlc_agency_admincategory":"臺北市政府教育局","o_tlc_agency_service":"1.　培養兒童了解自我、尊重與欣賞他人及不同文化之情懷。2.　注重領域教學、身心健康鍛鍊，並增進生活必需之基本知能。3.　樹立正確價值觀念，培養愛家、愛鄉土、愛國家的新世紀兒童。4.　培養表達、獨立思考、與人溝通、團隊合作、負責守法之素養。5.　著重品德涵養、文化陶冶及藝術欣賞，變化學生氣質。6.　營造多元學習環境，培養主動學習、終身學習之能力。7.　培養勇於嘗試、積極創新之精神，解決問題、創造思考之能力。8.　實施藝術、ｅ化、閱讀，多元的特色課程，充實學習內涵。9.　重視資訊科技、多語文的學習，適應現代社會並與國際接軌。10.　推動關懷的特殊教育，積極照顧弱勢家庭學生，使能適性發展。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_527_138610_51065.jpg","_id":20,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"平常上課日：早上5:00~7:00；下午5:30~10:00，開放運動場供民眾使用。上課期間以學生活動為主，不對外開放。","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tzes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_528_9158227_85389.jpg","o_tlc_agency_address":"臺北市中山區大直街2號","o_tlc_agency_phone":"(02)2533-3953","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中山區大直國民小學","o_tlc_agency_fax":"(02)2533-3102","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_528_9996089_85799.jpg","_id":21,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.bjes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_529_6504462_07301.jpg","o_tlc_agency_address":"臺北市中山區樂群二路266巷99號","o_tlc_agency_phone":"(02)8502-1571","o_tlc_agency_purpose":"設校理念：本校教育政策分述如下(一)學校課程自主化：尊重教育專業，依據學校、社區、學生的需要，透過學校課程自主，鼓勵多元參與，共同學習，接合學校同仁、社區及家長會力量共謀校務的創新與發展。(二)學習型態多樣化：以班群教學、小組討論、分站學習等方式，進行團體學習或個別學習，運用各種教學媒體及資訊網路，提供多樣的教學、多元的學習場所及多種的學習型態，讓教學生動活潑，提升學生學習成效。(三)教材內容統整化：配合九年一貫統整課程、期使教材內容生活化，掌握社會脈動，重視本土文化、國際化教學趨勢，豐富教學內涵。(四)學習空間彈性化：配合教學活動需要，以彈性隔間、組合式課桌椅、學習區組合、大型活動空間及戶外活動劇場等規劃，充分彈性靈活運用，增進教學品質。(五)校園設施人性化：本著教育性、安全性及人性化之校園規劃原則，以尊重「人」的經營理念，提供無障礙之教育情境，創造校園安全和諧。(六)教育經營社區化：學校建築配合周圍環境，運用社區之資源進行教學活動，達成與社區資源共享，促進學校與社區之緊密結合。學校教育理念、目標與策略：(一)教育理念1. 尊重學生學習的主體性、自主性與創造性。2. 提供精緻化學習環境，發展學生多元智能。3. 營造學習型組織氣氛，共塑學校發展特色。4. 推動資源共享，結合社區資源，共創教育新機。(二)教育目標1. 啟發潛能的快樂學習，培育具備基本能力。2. 自動自發的自主學習，發展創造思考能力。3. 激勵多元智慧的總體學習，建立良好人際互動。4. 培養勤學習、能活用、善表達、肯負責的好孩子。5. 我們努力的目標—學生歡喜上學，愛上學校，員工樂在工作，家長熱忱參與，各界肯定學校。(三)策略1. 倡導校園民主倫理，共塑學校之發展願景。2. 強調全人格之發展，快樂學習與建康成長。3. 尊重兒童學習主體，設計適性的教育過程。4. 推動課程統整觀念，兼顧班群與合作學習。5. 重視資訊科技應用，開括本土與國際視野。6. 營造溝通對話空間，尊重個性與群體發展。7. 慎密思考價值判斷，培養解決問題的能力。8. 重視教師專業研究，研發學校課程與教材。9. 建立終身學習理念，奠定社區教育化基礎。(更新日期：20100224)","o_tlc_agency_email":"public@bjes.tp.edu.tw","o_tlc_agency_name":"臺北市中山區濱江國民小學","o_tlc_agency_fax":"(02)8501-1146","o_tlc_agency_admincategory":"","o_tlc_agency_service":"幼兒園 小學教育","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_529_2411475_06540.jpg","_id":22,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yaes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_530_6822997_99268.jpg","o_tlc_agency_address":"臺北市中山區明水路397巷19弄1號","o_tlc_agency_phone":"(02)2533-5672","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中山區永安國民小學","o_tlc_agency_fax":"(02)8509-1863","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_530_4653811_99268.jpg","_id":23,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.djes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_531_9875006_42083.jpg","o_tlc_agency_address":"臺北市中山區濱江街107號","o_tlc_agency_phone":"(02)2503-5816","o_tlc_agency_purpose":"本校同仁以心教育為施教的核心，用最新的教育理念及最大的愛心與耐心，以生活教育為中心，實施正常的國民教育，培育品德高尚、體格健壯、術藝兼修之堂堂正正的好國民為目的。為達此目的，除依課程標準及上級實施開放教育之政策，確實執行外，並採親師合作規劃各項學藝及體能活動，使本校學童之身心能順利的正常發展。本校特色有以下十項：一、校園綠化有成。二、小班精緻教學。三、自辦學童午餐。四、強化生活課程。五、發揚民俗技藝。六、推廣生活美語。七、提倡多元社團。八、重視體能鍛鍊。九、深耕閱讀。十、舉辦校際交流。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中山區大佳國民小學","o_tlc_agency_fax":"(02)2861-6126","o_tlc_agency_admincategory":"","o_tlc_agency_service":"小學教育與幼兒教育。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_531_6589783_28881.jpg","_id":24,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"周一至周五7：00~18：00","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wcps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_532_324044_01153.jpg","o_tlc_agency_address":"臺北市中山區五常街16號","o_tlc_agency_phone":"(02)2502-3416","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中山區五常國民小學","o_tlc_agency_fax":"(02)2502-0992","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_532_1609492_01153.jpg","_id":25,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ccps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_533_5880984_70458.jpg","o_tlc_agency_address":"臺北市中山區長春路165號","o_tlc_agency_phone":"(02)2502-4366","o_tlc_agency_purpose":"本校位於市中心之商業區，學校與家長通力合作，積極爭取相關經費美化綠化校園、增設與改善軟硬體設施，期能共同營造安全、快樂，富有人文氣息的優質學習環境。目前設有自然、音樂、視覺藝術、英語、電腦與圖書等專科教室及屋頂教材園，使學生有充分的學習內涵及教學資源。","o_tlc_agency_email":"shyhjer@m3.ccps.tp.edu.tw","o_tlc_agency_name":"臺北市中山區長春國民小學","o_tlc_agency_fax":"(02)2506-5860","o_tlc_agency_admincategory":"","o_tlc_agency_service":"本校在歷任校長和教職員工的努力經營及家長會的全力支持下，校風穩健踏實、學習環境優質，在中山區是一所家長信賴、學生喜歡的理想學校。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_533_2459145_70438.jpg","_id":26,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"上班日上午八時至下午四時。","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.jjes.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市中山區龍江路62號","o_tlc_agency_phone":"(02)2507-0932","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市中山區中正國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":27,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"10"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.msps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_536_9340193_22910.jpg","o_tlc_agency_address":"臺北市松山區敦化北路199巷18號","o_tlc_agency_phone":"(02)2712-2452","o_tlc_agency_purpose":"本校位於臺北市民生社區文教生活圈，社區資源充沛，創校以來社區發展迅速，帶動學校學生額滿趨勢，學校校園文化和諧、教師專業發展傑出、親師非常用心合作，開拓豐富的教育資源提供教與學，創造出具口碑的民生文化。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市松山區民生國民小學","o_tlc_agency_fax":"(02)2718-0657","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_536_942945_22910.jpg","_id":28,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.mcps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_537_9642292_84081.jpg","o_tlc_agency_address":"臺北市松山區民權東路4段200號","o_tlc_agency_phone":"(02)2765-2327","o_tlc_agency_purpose":"本校位處向稱臺北市模範社區民生社區的本校，因地利之便而營造出與社區融為一體的環境優美校園，近年來更得力於家長志工團協助，致力於美化、綠化，使校園綠意盎然、繁花似錦，成為令人心曠神怡的學習園地。從建校的多元自由校風迄今發展為建構“多元、活力、前瞻、卓越„ 之學校願景，追求精實優質的教學目標，豐富的社團學習活動融合於總體課程中，提供孩子們更多元、更寬廣、更縱深的學習機會，使本校教學成效優良，校友們在往後升學及社會各領域均有極佳表現。","o_tlc_agency_email":"chi7545@gmail.com","o_tlc_agency_name":"臺北市松山區民權國民小學","o_tlc_agency_fax":"(02)27658336","o_tlc_agency_admincategory":"","o_tlc_agency_service":"（一）建構「多元、活力、前瞻、卓越」之學校願景，追求優質的教育目標；豐富的社團學習活動融合於總體課程之中，提供兒童更具廣度與深度的學習為目的，人人能依照自己的興趣、性向發展個人專長。（二）校內有多元的社團活動，包含國樂、管樂、絃樂、直笛、合唱等音樂社團；田徑隊、游泳隊、羽球隊、桌球隊、網球隊等體育社團；另有天文社、圍棋社、幼童軍團、幼女童軍團等多元才藝社團，讓學生的學習多元，透過豐富的社團活動，探索自己的興趣。（三）重視生活教育、德育教育及生命教育，規畫以綜合學習領域統合之，組成「生命教育工作坊」，進行教育研究並付諸於日常教學中。（四）推動書香校園活動，如：閱讀悅讀護照、讀詩樂樂讀詩、班級導讀、圖書室利用教育、晨讀十分鐘等相關活動，鼓勵孩子大量閱讀課外讀物。99學年度、100學年度獲選為臺北市讀報種子學校，營造校內讀報環境，組成「擁報樂趣多」專業社群，成立民權讀報電臺，努力提升校內閱讀風氣，以增進學生的語文能力。（五）與家長與社區互動和諧，志工團體參與人數眾多。另外，各班級設置班親會，與級任老師在班級教學事務及校外教學活動緊密互動，適時提供協助。「社區管樂團」春秋二季於中山堂、國家音樂廳辦理音樂會活動，由校長擔任副團長，管樂團指導老師擔任指揮，每年五月有「母親節才藝展演會」，提供學生展現自己的舞臺，廣邀家長與社區民眾觀賞，達成與社區資源共享。（六）體育社團蓬勃發展，積極辦理各種單項體育競賽，並參加羽球、桌球、網球、田徑、游泳、樂樂棒球、健康操等市級及全國競賽。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_537_1719593_84081.jpg","_id":29,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"依學校活動時間開放","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/enable.mces.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市松山區民生東路4段97巷7號","o_tlc_agency_phone":"(02)2712-4872","o_tlc_agency_purpose":"","o_tlc_agency_email":"313607-12@tp.edu.tw","o_tlc_agency_name":"臺北市松山區民族國民小學","o_tlc_agency_fax":"(02)2718-0882","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":30,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/web.jkes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_541_4057856_63437.jpg","o_tlc_agency_address":"臺北市松山區延壽街168號","o_tlc_agency_phone":"(02)2528-2814","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市松山區健康國民小學","o_tlc_agency_fax":"(02)2528-5047","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_541_413772_63437.jpg","_id":31,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tyes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_569_5955461_07039.jpg","o_tlc_agency_address":"臺北市萬華區東園街195號","o_tlc_agency_phone":"(02)2303-4803","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區東園國民小學","o_tlc_agency_fax":"(02)2301-8044","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_569_2129420_07213.jpg","_id":55,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.sups.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_542_2402380_13305.jpg","o_tlc_agency_address":"臺北市松山區三民路5號","o_tlc_agency_phone":"(02)2760-9221","o_tlc_agency_purpose":"以台北市教育發展手冊願景為藍圖，『人與我』、『人與自然』、『人與社會』三大目標，規劃出西松學校本位課程，在回應十大基本能力，使學校本位課程達成九年 一貫 基本精神與內涵。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市松山區西松國民小學","o_tlc_agency_fax":"(02)2766-2370","o_tlc_agency_admincategory":"","o_tlc_agency_service":"1. 落實九年一貫精神，發展學校本位課程和多元評量。 2. 發展創新和多元教學模式，提升學生基本能力。 3. 推動教師專業成長、提升教學專業知能。 4. 辦理學生課後社團活動，提供多元學習管道 5. 強化班級經營，暢通親師溝通。 6. 建立同儕輔導及合作機制，形塑校園倫理溫馨氛圍 7. 汰換更新教學設備，改善教學環境 8. 規劃校園空間改造，改善老舊校舍風貌 9. 強化行政團隊領導能力，提升行政效能","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_542_3844746_02842.jpg","_id":32,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"依活動時間開放","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.smps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市松山區民權東路5段1號","o_tlc_agency_phone":"(02)2764-6080","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市松山區三民國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":33,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.cups.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_544_147226_57496.jpg","o_tlc_agency_address":"臺北市大安區愛國東路79巷11號","o_tlc_agency_phone":"(02)23917402","o_tlc_agency_purpose":"營造健康.和樂.進步的優質校園，許孩子一個金色年華的童年。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區金華國民小學","o_tlc_agency_fax":"(02)23918478","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_544_1992783_57496.jpg","_id":34,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ktps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_546_8317503_60339.img_0514[1]","o_tlc_agency_address":"10647臺北市大安區羅斯福路3段201號","o_tlc_agency_phone":"(02)2363-9795","o_tlc_agency_purpose":"活力  創新  共榮","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區古亭國民小學","o_tlc_agency_fax":"(02)2363-7599","o_tlc_agency_admincategory":"","o_tlc_agency_service":"國民小學教育","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_546_8717342_60340.img_0515[1]","_id":35,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"場地開放時間：1.平時：上午五時至七時、下午五時卅分至九時止。2.週休二日及假日：自上午五時至下午九時。3.寒暑假：本校辦理課後輔導及課外社團，比照平時辦理。","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.snes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_547_988198_79342.jpg","o_tlc_agency_address":"臺北市大安區新生南路2段36號","o_tlc_agency_phone":"(02)2391-3122","o_tlc_agency_purpose":"辦學的目標經營人性的校園文化     ─ 讓每個孩子都喜歡上學。整合人、事、物的教育資源，提供優質的教育環境。建構人文與科技融合的學習環境，以增廣國際觀，作一個有尊嚴的地球村民。提供整潔、美觀、舒適、安全、溫馨的校園生活。精進教師班級經營知能，促進兒童的認識自我、能體會倫理、能遵守規範、能理性思考的全人格發展。 提供多元課程，多樣的活動      ─ 讓每個孩子都能自在成長。發展學校本位課程，並以統整式的課程提供完整且有效的學習。精進「認識兒童」的教師知能，奠定個別化、多元化的教學基礎。設計動、靜兼具的多樣學習活動，以發展個別潛能。增進教師多元評量的知能，肯定並發展多元智慧。精進教學的方法與內容     ─ 讓每個孩子都有恰如其份的學習。設計適合學校、班級、個別兒童的課程，並編選教材，以收適性化教學之效。適當且多量利用科技媒體，協助兒童由「知道」之層次，進入「理解」及「體驗」之層次。提供體驗與探索課程，使教學兼顧「知識能力」與「方法能力」之培養。充分利用豐富的人、事、物學習資源，適應個別的、以及多元發展的需要。培養運用英語與資訊能力的處理     ─ 讓每個孩子都能適應國際化的未來。","o_tlc_agency_email":"hplee@tp.edu.tw","o_tlc_agency_name":"臺北市大安區新生國民小學","o_tlc_agency_fax":"(02)2391-3122","o_tlc_agency_admincategory":"","o_tlc_agency_service":"辦學的重點    統整的課程與教學設置課程發展委員會，發展國小與幼稚園銜接之學校本位課程。實施主題統整教學，安排適性的學習活動，培養學生核心能力。結合班群空間，透過班群教師的深度對話與合作，整合教學資源，建構協同教學模式。設計多樣化的學習活動，以實作、體驗、討論、檔案等多元化的評量方式，開發學生多元智慧。推動英語及資訊科技融入教學，以因應時代潮流，讓孩子的學習與未來接軌。結合圖書館利用教育及閱讀教學，推廣親師生閱讀活動，落實終身學習理念。推廣行動研究方案，提高研究風氣，建立教師研究社群。主動協助教師，進行各項研修活動，以深化教學內涵，實現學校教育願景    健康有禮的生活與實踐以學生為中心，以生活為範圍，以愛心為動力，培養有禮貌、守秩序、愛整潔、重榮譽的快樂兒童。加強護目保健、潔牙運動、衛教活動，建立良好的健康觀念與習慣。提供學生才藝技能發表與演出的機會，訓練學生獨立自主的能力，讓孩子得以多元適性的發展。積極推動資源回收工作，發起愛校護校運動，並在日常生活中落實環境教育。推動各項體能活動，鼓勵孩子培養運動習慣與態度，以鍛鍊強健體魄。健全警護制度，結合家長力量設置愛心站與安全地圖，維護校內外交通及遊戲安全。    優質的設施與學習情境妥善運用經費，提供教學支援，配合整體校務運作。整合教學資源，建構兼具人文與科技學習情境。積極主動服務，維護各項學校設施。做好安全防護工作，提供師生安全、舒適與溫馨的環境。完善規劃預算，爭取社會資源，繼續充實教學設備。     有效能的輔導網絡實施班級團體輔導及小型團體輔導，落實生活輔導，維護身心健康。利用晨光活動指導弱勢的兒童，加強學習輔導，協助開發潛能。透過特教宣導及體驗活動，實踐融合教育理念，培養關懷、包容及同理的態度。鼓勵親師生合作，彰顯『學校日』及『班親會』功能，親師充分對話溝通，達成契合之教育理念。整合家長資源，成立志工團，協助校務運作，推展社區公共關係。協助非華語系的兒童克服語文障礙，適應學校生活環境，以達成『內接外轉』之功效。成立家長讀書會，辦理系列家長成長活動，提昇親職功能。    體驗探索的幼兒教育以主題教學模式，安排多樣化學習活動，發展幼教與國小銜接課程。落實生命教育，讓孩子在互動成長中學會關懷。進行體驗活動，讓孩子在生活學習中體驗文化。鼓勵獨立思考，讓孩子在主動探索中創造自我。實施生活課程，讓孩子在表達溝通中建立人際關係。強化幼教專業，提昇行動研究能力。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_547_2367690_79914.jpg","_id":36,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"上學時間：週一至週五 7:20 - 16:00","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.haps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_548_3083047_02391.jpg","o_tlc_agency_address":"臺北市大安區仁愛路3段22號","o_tlc_agency_phone":"(02)2707-4191","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區幸安國民小學","o_tlc_agency_fax":"(02)2708-1845","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_548_5545913_02391.jpg","_id":37,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.slps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_593_188699_26222.jpg","o_tlc_agency_address":"臺北市士林區大東路165號","o_tlc_agency_phone":"(02)2881-2231","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區士林國民小學","o_tlc_agency_fax":"(02)2880-1364","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_593_3579110_26222.jpg","_id":78,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.laes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_549_8284623_21624.jpg","o_tlc_agency_address":"臺北市大安區新生南路3段33號","o_tlc_agency_phone":"(02)2363-2077","o_tlc_agency_purpose":"龍安願景：安穩、健康、充實龍安學生圖像：愛己、感恩、行善","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區龍安國民小學","o_tlc_agency_fax":"(02)2363-7798","o_tlc_agency_admincategory":"","o_tlc_agency_service":"一至六年級及幼兒園的學生學習和全人教育","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_549_4954944_59947.jpg","_id":38,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"非上課開放時間：星期二～五  晚上6：00～10：00                                星期六、日  早上8：00～下午5：00","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ntueees.tp.edu.tw\/newweb\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市大安區和平東路2段94號","o_tlc_agency_phone":"(02)2735-6186","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"國立臺北教育大學附設實驗國民小學","o_tlc_agency_fax":"(02)2735-0818","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":39,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.jnps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_551_7226765_84482.jpg","o_tlc_agency_address":"臺北市大安區大安路2段99號","o_tlc_agency_phone":"(02)2707-7119","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區建安國民小學","o_tlc_agency_fax":"(02)2708-1316","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_551_878830_84482.jpg","_id":40,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.mhps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_553_2889702_26374.jpg","o_tlc_agency_address":"臺北市大安區羅斯福路4段21號","o_tlc_agency_phone":"(02)2363-9815","o_tlc_agency_purpose":"","o_tlc_agency_email":"mhps.pass@gmail.com","o_tlc_agency_name":"臺北市大安區銘傳國民小學","o_tlc_agency_fax":"(02)2362-0782","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_553_5965569_26374.jpg","_id":41,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.gges.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_554_5715713_21613.jpg","o_tlc_agency_address":"臺北市大安區基隆路4段41巷68弄2號","o_tlc_agency_phone":"(02)2735-1734","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區公館國民小學","o_tlc_agency_fax":"(02)2732-6068","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_554_4877186_21654.jpg","_id":42,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.japs.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_556_1511980_78016.jpg","o_tlc_agency_address":"臺北市大安區安和路1段60號","o_tlc_agency_phone":"(02)2709-5010","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市大安區仁愛國民小學","o_tlc_agency_fax":"(02)2708-1312","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_556_8509204_78016.jpg","_id":43,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"12"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.fhps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_558_5595767_99345.jpg","o_tlc_agency_address":"臺北市萬華區中華路1段66號","o_tlc_agency_phone":"(02)2314-4668","o_tlc_agency_purpose":"本校位居臺北市交通樞紐，吸引優秀教師任教及莘莘學子就學。福星國小春風廣被，畢業校友眾多，英才淵藪，於各行業皆有傑出的表現，展現出『今日我以福星為榮，明日福星以我為榮』的傳統精神。近百年校史孕育出純樸校風，家長重視家庭教育，學生素質中上，成就動機高，並訂有全校性的學生獎勵制度，提昇學生學習向上的動力。榮獲台北市教育局優質學校標章，辦學績效深獲肯定；班級導師諄諄教誨、作育英才，師生互動良好。歷年家長會頃力協助，並熱心擔任校內各項義工，使校務運作順暢。","o_tlc_agency_email":"373611-12@tp.edu.tw","o_tlc_agency_name":"臺北市萬華區福星國民小學","o_tlc_agency_fax":"(02)2375-1574","o_tlc_agency_admincategory":"","o_tlc_agency_service":"豐富的社團學習活動融合於總體課程之中，提供兒童更具廣度與深度的學習，人人可依自我興趣、性向發展個人專長，實現多元探索的學習機會。逐年充實圖書與資訊設備，鼓勵閱讀、資訊融入各科，豐富學子的學習內涵。本校每學期開設各種課後社團，兼具體育性與藝文性，吸引許多學子參加；每學期舉辦發表社團才藝發表會，教學成果斐然。本校著名的福星國小合唱團成立於民國四十年，音樂實驗班成立於民國六十二年，擁有優良傳統，孕育出無數的音樂學子，在各大音樂賽事中榮獲優異成績，歷屆音樂班校友更活躍於國內外樂壇。民國九十六年成立體育班，專攻排球項目，屢屢在臺北縣市賽事中，榮獲優異成績。民國九十九年，更囊括『臺北市教育盃排球賽』六年級男童女童乙組雙料冠軍。本校輔導室附設資源班，提供輔導教學，使學習障礙、情緒障礙的孩子獲得悉心的指導與照顧，在這裡，可以看見孩子們都有顯著的進步與成長。本校附設幼稚園，老師們秉持熱忱、敬業的精神，培育著國家未來的小幼苗，辦學成果深獲教育局及家長們的肯定。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_558_6643327_84213.jpg","_id":44,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"每週一至五08:00–17:00","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.jtes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_594_5944304_22363.jpg","o_tlc_agency_address":"臺北市士林區通河街16號","o_tlc_agency_phone":"(02)2885-5491","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區劍潭國民小學","o_tlc_agency_fax":"(02)2886-5919","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_594_9435590_23417.jpg","_id":79,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hmes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_559_6160548_94221.jpg","o_tlc_agency_address":"臺北市萬華區成都路98號","o_tlc_agency_phone":"(02)2389-2182","o_tlc_agency_purpose":"一、實施人性化、民主化領導，強化行政服務效能二、精進教師教學效能，激發學生學習潛能三、開闢多元學習管道，拓展學生成長活力與專長四、推動美感教育，建構優質教育環境五、持續推動「深耕閱讀」活動，積極培養學生核心能力六、提供順性揚才發展機會、落實教育公平正義理念七、暢通親師溝通管道，緊密夥伴關係八、前瞻規劃穩健經營、邁向「卓越西門」特色學校","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區西門國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_559_5707030_94221.jpg","_id":45,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tlsps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_560_7108357_95410.gif","o_tlc_agency_address":"臺北市萬華區桂林路64號","o_tlc_agency_phone":"(02)2336-1266","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區老松國民小學","o_tlc_agency_fax":"(02)2304-2493","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":46,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.lses.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_561_579625_19399.jpg","o_tlc_agency_address":"臺北市萬華區和平西路3段235號","o_tlc_agency_phone":"(02)2308-2977","o_tlc_agency_purpose":"本校在陳榮富校長領導下，以「成就孩子的未來」為教育的核心理念，以「助人、成人、感人、化人」的教育歷程，期待學校是孕育學生品格涵養的搖籃，以「健康、快樂、新國民；活力、前瞻、展卓越」辦學願景，期待提升教師專業，整合熱情參與家長的力量，許龍山國小美好的未來。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區龍山國民小學","o_tlc_agency_fax":"(02)2304-3127","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_561_1125826_19399.jpg","_id":47,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/web.hces.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市萬華區環河南路2段250巷42弄2號","o_tlc_agency_phone":"(02)2306-4352","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區華江國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":48,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.syps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市萬華區莒光路315號","o_tlc_agency_phone":"(02)2306-1893","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區雙園國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":49,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hups.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市萬華區東園街73巷65號","o_tlc_agency_phone":"(02)2303-5573","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區西園國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":50,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wtps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_565_2835625_09453.jpg","o_tlc_agency_address":"臺北市萬華區萬大路346號","o_tlc_agency_phone":"(02)2303-7654","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市萬華區萬大國民小學","o_tlc_agency_fax":"(02)23019125","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_565_4353065_09453.jpg","_id":51,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.kjes.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市萬華區萬大路423巷15號","o_tlc_agency_phone":"(02)2303-2874","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市私立光仁國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":52,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.soes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_567_8612921_88217.jpg","o_tlc_agency_address":"臺北市萬華區西藏路125巷31號","o_tlc_agency_phone":"(02)2303-8298","o_tlc_agency_purpose":"培養健康、快樂、負責、守法、感恩之健全人格","o_tlc_agency_email":"soes@tp.edu.tw","o_tlc_agency_name":"臺北市萬華區新和國民小學","o_tlc_agency_fax":"(022305-8574","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_567_611790_88217.jpg","_id":53,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"3"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wsps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_570_15118_78027.jpg","o_tlc_agency_address":"臺北市信義區松仁路226號","o_tlc_agency_phone":"(02)2720-0226","o_tlc_agency_purpose":"發展學校特色、回歸教育本質、幫助孩子成長學校圖像：「生氣蓬勃、溫情有愛。 」兒童圖像：「健康、快樂、尊重、負責。」教師圖像：「喜愛孩子、勤於學習、樂在教學。」家長圖像：「以愛和榜樣支持教育，成為教師的工作夥伴。」","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區吳興國民小學","o_tlc_agency_fax":"(02) 8788-3043","o_tlc_agency_admincategory":"","o_tlc_agency_service":"有開辦「附設補習補校」和「成人基本教育研習班」","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_570_156427_78027.jpg","_id":56,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.syes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_571_564630_84181.jpg","o_tlc_agency_address":"臺北市信義區松勤街60號","o_tlc_agency_phone":"(02)2720-4005","o_tlc_agency_purpose":"（一）、培養學生服務人群的信念與技能：           「以利他之存心，完成利己之目的」為信念，以慈悲包容人，以智慧解決事」為服務方法。（二）、激發學生主動學習的熱誠與能力：            瞭解學生身心之歷程，施予適當之教育措施，激發學習動能，使其獲得學習的滿足，達成終身學習，完成自我實現。（三）、營造親、師、生共同經營的學校：           以學生教育利益為優先，家長及教師共同合作，同時發揮學校與家庭教育的功能。擴大參與管道，促進意見的交流與共識的建立，以達成學校的教育任務。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區信義國民小學","o_tlc_agency_fax":"(02)27253247","o_tlc_agency_admincategory":"","o_tlc_agency_service":"服務人群        多元學習       快樂和諧","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_571_3192447_83422.jpg","_id":57,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.shps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_572_824968_14826.jpg","o_tlc_agency_address":"臺北市信義區基隆路2段99號","o_tlc_agency_phone":"(02)2738-5488","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區三興國民小學","o_tlc_agency_fax":"(02)2737-2684","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_572_6455115_13565.jpg","_id":58,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yhps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_573_9188632_28095.jpg","o_tlc_agency_address":"臺北市信義區松山路287巷5號","o_tlc_agency_phone":"(02)8785-8111","o_tlc_agency_purpose":"一學校教育目標：  1. 提供優質的生活環境，促使學生健康成長。 2. 實施多元活潑教學，增進學生快樂學習。 3. 規劃豐富學習內涵，建構學習型學校，奠定學生全面追求卓越 成就      的基礎。 4. 尊重每個人的價值和尊嚴，發揚人文精神。 5. 暢通溝通管道，鼓勵教師家長參與校務。 6. 尊重教師專業自主權，建立學校本位管理。 7. 實施全面品質管理落實績效責任。 8. 開放學校場地，資源共享，互助共榮 9. 前瞻性原則：徵詢同仁、學生、家長與社區的意見二學校願景：  培養 求真 致善 達美 的新世紀健全國民三學校目標：  期望「永吉人」皆能以樂觀的態度，接納與生俱來的一切，不怨天尤人、不自暴自棄，能夠感恩珍惜擁有，時時求進步，懷抱 「 安全 、 快樂 、 有活力 ； 自律 、 關懷 、 有創意 」的超越精神，朝向潛能的發揮，開創生命的價值高峰。","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區永吉國民小學","o_tlc_agency_fax":"(02)8785-8106","o_tlc_agency_admincategory":"","o_tlc_agency_service":"幼兒園、國民小學教育、成人教育班","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_573_1206788_70189.jpg","_id":59,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"週一~五8:00~16:00上班上課","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ycps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_574_6886424_59435.jpg","o_tlc_agency_address":"臺北市信義區松山路225巷48號","o_tlc_agency_phone":"(02)2764-1314","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區永春國民小學","o_tlc_agency_fax":"(02)2760-2009","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_574_1559948_59435.jpg","_id":60,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hyps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_575_3934225_22363.jpg","o_tlc_agency_address":"臺北市信義區基隆路1段83巷9號","o_tlc_agency_phone":"(02)2761-8156","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區興雅國民小學","o_tlc_agency_fax":"02)2766-2428","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_575_4021915_22363.jpg","_id":61,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.bles.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_595_4005659_59678.jpg","o_tlc_agency_address":"臺北市士林區福港街205號","o_tlc_agency_phone":"(02)2881-7683","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區百齡國民小學","o_tlc_agency_fax":"(02)2883-1163","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_595_7589052_59678.jpg","_id":80,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.kfps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_576_6962997_90547.jpg","o_tlc_agency_address":"臺北市信義區光復南路271號","o_tlc_agency_phone":"(02)2758-5076","o_tlc_agency_purpose":"以學生學習為主體，改善學校各項教學設施，營造校園人文環境，開發學生潛能，以快樂、學習、感恩的經營方式，結合專業、熱誠、有夢的愛心老師，與關懷、合作、有情的溫馨家長，共同培養主動、尊重、友愛的二十一世紀全人發展光復新兒童。","o_tlc_agency_email":"kfps.tp.edu.tw","o_tlc_agency_name":"臺北市信義區光復國民小學","o_tlc_agency_fax":"(02)2758-0626","o_tlc_agency_admincategory":"","o_tlc_agency_service":"國小教育、親職教育、","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_576_2914888_90547.jpg","_id":62,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"週一至週五上午8時至下午四時","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.baps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_577_6230460_84967.jpg","o_tlc_agency_address":"臺北市信義區松仁路95巷20號","o_tlc_agency_phone":"(02)2345-0616","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區博愛國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_577_2455539_84967.jpg","_id":63,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.fdps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市信義區福德街253號","o_tlc_agency_phone":"(02)2727-7992","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市信義區福德國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":64,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"6"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.flps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_579_9210192_43482.jpg","o_tlc_agency_address":"臺北市士林區福志路75號","o_tlc_agency_phone":"(02)2831-6293","o_tlc_agency_purpose":"「美的福林兒童」的願景。培養尊重關懷、健康活力、創新合作，成為真善","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區福林國民小學","o_tlc_agency_fax":"(02)2833-5480","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_579_8287925_43482.jpg","_id":65,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"全天","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hops.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區至善路3段199號","o_tlc_agency_phone":"(02)2841-1010","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區溪山國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":66,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.sses.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區中社路2段66號","o_tlc_agency_phone":"(02)2841-1038","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區雙溪國民小學","o_tlc_agency_fax":"(02)2841-1268","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":67,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yses.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_582_2156803_66281.jpg","o_tlc_agency_address":"臺北市士林區至誠路1段62巷70號","o_tlc_agency_phone":"(02)2831-1004","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區雨聲國民小學","o_tlc_agency_fax":"(02)28360645","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_582_8205112_66282.jpg","_id":68,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ynes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_583_5547772_74981.jpg","o_tlc_agency_address":"臺北市士林區忠義街1號","o_tlc_agency_phone":"(02)2832-9700","o_tlc_agency_purpose":"尊重關懷生命,樂觀進取學習,多元智慧發展,全人成長精進","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區雨農國民小學","o_tlc_agency_fax":"02-28319401","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_583_1147150_74981.jpg","_id":69,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ymps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區仰德大道3段61號","o_tlc_agency_phone":"(02)2861-6366","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區陽明山國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":70,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hrps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_596_139540_89757.jpg","o_tlc_agency_address":"臺北市士林區環河北路3段95號","o_tlc_agency_phone":"(02)2812-9586","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區葫蘆國民小學","o_tlc_agency_fax":"(02)2811-3761","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_596_7074421_89757.jpg","_id":81,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/home.pdps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_585_8343846_91521.jpg","o_tlc_agency_address":"臺北市士林區平菁街101號","o_tlc_agency_phone":"(02)2861-0503","o_tlc_agency_purpose":"平等國小創校於民國十年，當時稱為草山公學校坪頂分離教室，至今已有八十多年歷史。學校位處海拔410m的山區，對外交通以單一產業道路聯通雙溪及山仔后。學區緊鄰陽明山國家公園東南側，學區內有先民開鑿的坪頂古圳與古步道，豐富的自然生態及人文歷史遺跡是本校重要的教學資源。     本校為教育局指定實施田園實驗教學學校，於民國八十年起至民國九十年，累積可觀的教學資源，對於本校實施九年一貫課程之學校本位課程有相當的助益，尤其本校自九十一學年度實施步道教學課程，課程成效良好，並多獲好評。    此外，本校傳承薪傳獎大師李天祿先生之「巧宛然」掌中戲團。自民國七十七年成立以來，十餘年間在全臺各地暨韓國、加拿大、日本、澳洲等地，積極推展傳統民俗技藝與文化交流。全校現有班級數為普通班6班，資源班1班，附設幼稚園1班。    歷任校長致力於校務經營與學校發展特色，積極克服困難，建設各項軟硬體設施以及改善校園環境，配合得天獨厚的自然資源，予學子優質、精緻的教育。學校雖小卻「五臟俱全」，各科專科教室、學生活動中心、游泳池、操場、環校步道等設施齊全。","o_tlc_agency_email":"vin858@gmail.com","o_tlc_agency_name":"臺北市士林區平等國民小學","o_tlc_agency_fax":"(02)2861-3642","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_585_7119057_91521.jpg","_id":71,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/new.zsps.tp.edu.tw\/xoops\/html\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區德行東路285號","o_tlc_agency_phone":"(02)2831-6115","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區芝山國民小學","o_tlc_agency_fax":"(02)2834-0393","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":72,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.stes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_588_5681278_51337.jpg","o_tlc_agency_address":"臺北市士林區中山北路6段392號","o_tlc_agency_phone":"(02)2871-0064","o_tlc_agency_purpose":"全人教育","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區士東國民小學","o_tlc_agency_fax":"(02)2873-8591","o_tlc_agency_admincategory":"","o_tlc_agency_service":"幼兒園、國小部、成人夜補校","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_588_5362004_51337.jpg","_id":73,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"下午5:30~9:30","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.syups.tp.edu.tw","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_589_1966711_84799.jpg","o_tlc_agency_address":"臺北市士林區天母東路116號","o_tlc_agency_phone":"(02)2875-1369","o_tlc_agency_purpose":"三玉期望提供孩子「能適性發展以自我實現」的學習場域，整合「健康、和諧、學習」之學校發展願景，在「生命健康、生態和諧、生活學習」人生三大學習的基本需求下，透過專業的教學歷程進行有效的知能轉化，藉以培養一位動靜合宜、健康卓越世界觀的優雅三玉人。","o_tlc_agency_email":"syups@tp.edu.tw","o_tlc_agency_name":"臺北市士林區三玉國民小學","o_tlc_agency_fax":"(02)2874-1607","o_tlc_agency_admincategory":"","o_tlc_agency_service":"提供小學一至六年級學童接受完善的國小國民教育","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_589_3584272_84799.jpg","_id":74,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"平日上學時間AM7:50~PM3:50","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tmups.tp.edu.tw","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_590_2863676_18995.png","o_tlc_agency_address":"臺北市士林區天玉街12號","o_tlc_agency_phone":"(02)2872-3336","o_tlc_agency_purpose":"把握「學生第一」的教學原則，提供「教學為先」的行政服務，發展「安全快樂」的教學環境，設計「多元適性」的學習內涵，策進「前瞻正確」的行政決定，推動「親師合作」的伙伴關係，營造「民主開放」的學校氣氛，形塑「優質典雅」的校園文化，建立「共治共榮」的學習園地。綜合以上辦學理念，我們共塑天母國小的願景為：「多元發展國際觀，快樂自信天母人」","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區天母國民小學","o_tlc_agency_fax":"(02)2873-0345","o_tlc_agency_admincategory":"","o_tlc_agency_service":"一至六年級學齡兒童之國民教育","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_590_7105880_18996.jpg","_id":75,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"上課期間：上午7:30~下午6:00不對外開放對外開放時間：上午7:00~7:30 及 下午6:00~9:00","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.lyps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區磺溪街57號","o_tlc_agency_phone":"(02)2836-6052","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區蘭雅國民小學","o_tlc_agency_fax":"(02)2835-8475","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":76,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wces.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_592_7892152_10088.jpg","o_tlc_agency_address":"臺北市士林區文林路615巷20號","o_tlc_agency_phone":"(02)2836-5411","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區文昌國民小學","o_tlc_agency_fax":"(02)2836-2943","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_592_6444179_10111.jpg","_id":77,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.stps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市士林區延平北路6段308號","o_tlc_agency_phone":"(02)2811-7329","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市士林區社子國民小學","o_tlc_agency_fax":"(02)2813-2763","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":82,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"2"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ysps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_599_3773703_83249.jpg","o_tlc_agency_address":"臺北市北投區新民路2號","o_tlc_agency_phone":"(02)2891-4537","o_tlc_agency_purpose":"營造活力逸仙~健康、快樂、進步實踐共同願景~熱誠、積極、效能一、建立優質的學校整體形象。二、兼顧個性發展與群性陶冶。三、重視課程的適應性，加強語文及藝文教學。四、辦理多樣的教育活動，培養學生多元的能力。五、激勵教師成為專家教師的動力。六、學生的安全與健康是學校辦學的首要目標。七、許孩子一個希望的未來。","o_tlc_agency_email":"ndmen@ysps.tp.edu.tw","o_tlc_agency_name":"臺北市北投區逸仙國民小學","o_tlc_agency_fax":"(02)2892-4201","o_tlc_agency_admincategory":"","o_tlc_agency_service":"逸仙，是一所有歷史，有故事的小學，也是全國唯一以「逸仙」為名的學校。我們自詡是「山腳下的逸仙，樟樹下的樂園」。近年來，學校在轉型蛻變中，大幅更新老舊校舍、美化校園環境、增置遊戲器材、更新電腦及專科教室，並充實教學設備，提供便利、豐富的教學環境；軟實力部分，強化教師專業成長，申請社群發展計畫，成立教師工作坊，積極進行校本課程設計與教學實驗。並以品格教育為核心，推展「閱讀」「體驗」「關懷」為主之校本課程，規劃多元的學習活動，設計生動活潑的情境，延伸學習場域，進而擴展學習視野。經過親師生攜手，同心協力再接再勵，獲得最佳肯定，榮獲98年度臺北市優質學校學生學習獎項，並於99學年度通過臺北市教育111標竿學校認證。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_599_9315168_83249.jpg","_id":84,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"07:10~18:30","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.cjps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_600_7920563_75138.jpg","o_tlc_agency_address":"臺北市北投區公館路220號","o_tlc_agency_phone":"(02)2891-2764","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區清江國民小學","o_tlc_agency_fax":"(02)2892-1839","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_600_8692917_75138.jpg","_id":85,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.cyps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_601_9045504_00395.jpg","o_tlc_agency_address":"臺北市北投區東昇路34號","o_tlc_agency_phone":"(02)2895-1258","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區泉源國民小學","o_tlc_agency_fax":"(02)2892-5970","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_601_3898275_00395.jpg","_id":86,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.dtps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_602_3903670_89654.jpg","o_tlc_agency_address":"臺北市北投區復興三路312號","o_tlc_agency_phone":"(02)2891-4353","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區大屯國民小學","o_tlc_agency_fax":"(02)2893-5641","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_602_9761130_89654.jpg","_id":87,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.whps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_604_2920840_17975.jpg","o_tlc_agency_address":"臺北市北投區文化三路1號","o_tlc_agency_phone":"(02)2893-3828","o_tlc_agency_purpose":"校訓：惜福感恩自愛愛人","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區文化國民小學","o_tlc_agency_fax":"(02)28961238","o_tlc_agency_admincategory":"","o_tlc_agency_service":"臺北市北投區文化國小發展特色一、語文教育語文教育是所有學習活動的基礎，只有紮實的語文教育，其他相關領域教學、相關能力培養才能持續延展，因此語文活動的豐富與落實，是本校教學一直追求的重點。為落實每個孩子們的語言、語文表達能力，學校特地安排下列學習活動：每年定期舉辦校內國語文競賽，有：低年級說故事比賽、中年級演說、書法比賽、高年級書法、字音字形、即席演講、朗讀和作文比賽。 每週發下低、中、高「每週一文」資料，進行朗讀比賽和閱讀。 高年級每週進行演說比賽。 舉辦語文冬令營，針對有語文專長學生集訓。 落實國語文教學，指導學生閱讀策略。 鼓勵學生大量閱讀各類書籍，提昇語文能力。 二、兒童閱讀與圖書館利用教育推動書香制度，鼓勵學生閱讀好書，累計20、50、100本好書並書寫閱讀心得，頒發書香學士、碩士、博士獎。 全校學生在小學六年內必須閱讀100本好書並書寫閱讀紀錄。 每週推出「小博士信箱」和「語文萬花筒」有獎徵答活動，鼓勵學生查檢資料。 每月有「主題書展」，配合學校活動或節慶做專書介紹。 舉辦金書獎活動，鼓勵學生製作小書，瞭解書的結構。 三年級閱讀指導課由有專長之愛心志工進行教學。 一班一書總計有150套左右，可由各班借用，全班學生共讀分享。 每週週二辦理書精靈老師說故事活動。 定期辦理查字典比賽、查資料比賽。 上學期辦理好書推薦大家讀活動，下學期辦理好書交換活動。 三、英語教學本校於九十學年度奉臺北市政府教育局核准，為第一所全面性試辦英語教學之公立小學，幾年來兢兢業業，從政策制度的研擬、教學情境的營造、晨光英語的實施、節慶主題的教學、教師專業的強化，以及寒暑假英語梯隊的活動，都可以看到學校的努力與學生的成長。甄聘英語認證合格教師，幼稚園至六年級均進行英語教學，加強學生英語聽、說能力。並於課輔班安排英語小班教學，提供更多接觸英語的環境。 於九十學年度起，奉教育局核准全校全面性試辦加強英語教學。 英語教學採全美語教學，提昇學生聽力。 大量採購英語童書，提供學生豐富的英語閱讀環境。 積極營造有利於學習的軟、硬體雙語環境。 研發外籍教師英語教材。 製作晨光英語系列活動。 每年度辦理英語日活動，提供學生全語生活化的體驗情境。 進行各項英語專案研究，發展校本英語課程，及提供臺北市國小英語推動之參考。 辦理各類型英語補教教學活動、親子共學英語活動。 辦理寒暑假英語營隊活動及暑假遊學活動。 四、資訊教育訂定本校資訊課程綱要，明定本校學生三至六年級資訊課程與學生能力。 鼓勵教師製作數位課程與教材。 申請資訊專案計畫，提升學生資訊應用能力。 五、性別平等教育文化國小是本市國小性別平等教育中心彙辦學校及北投區性別平等教育重點學校，從創校即已積極投入性別教育，積極研發相關課程及教材，期以引導孩子們認識自我的成長與發展，學習如何與人相處、與異性相處，且能適時的保護自己，察覺危機，並奠定掌握自己的生涯規劃基礎。性別教育是本校實施多年的一大特色。六、教師專業成長教師為何無法成為一般人眼中的專業，實是教師本身對自我專業的認同度不足，以及對教學的不嚴謹，讓人有所質疑，才使得教師的社會地位日益下滑，專業成分不如律師、醫師、建築師、會計師等師字輩的行業。本校為強化教師的專業能力與提昇教學的精緻品質，特別將教師的專業成長列為學校重大行事之一。為拓展教師專業成長，本校的作法如下： (一)深度專業對話：健全相關組織，擬訂全面性課程發展計畫及討論主題，落實於學年會議、領域課程會研究會、行政會議、課程發展委員會中討論。兼顧縱向橫向課程規劃，使學校成員能循序漸進，由點至面凝聚共識。 (二)提昇專業素養：精緻規劃各項教師成長活動：邀請專家學者及實務經驗教師擔任專題演講講座。 成立教師讀書會（教學檔案與專業成長、童書演奏……等）。 每週週五晨會持續進行教師教學與研究經驗分享。 (三)有效知識管理：成立教學資源中心，收集教材、教具、教學媒體及各類資源。 每位教師均建立教學檔案，並安排相關專業成長活動，如讀書會、專題演講、觀摩展示分享，並給予每位教師回饋建議，還拍攝成數位檔，安排與全校教師分享。 學生建立學習檔案，並推動主題研究及小書製作。 結合資訊網路，建立教學專業對話平台，提供教師應用、分享。 (四)推動研究風氣：執行教育局各項研究專案，並於校內積極推展教育行動研究，本校參與教師相當踴躍，且連續多年在教育局所主辦的行動研究比賽中名列前茅，獲得豐碩成果。 結合行動研究、兩性平等教育、專案研究、英語教學、資訊課程出版專輯，提供同仁及教育夥伴分享。 (五)掌握教學品質：掌握有效教學、協同教學、多元評量、學生身心階段發展特質、各領域關鍵能力點與知識點之研究……等原則，落實於教學與評量。 (六)共塑學校願景：透過意見交流、觀念溝通、彙整、協商、決議，討論親師生圖像，共塑學校願景。 (七)發展校本課程：以「本國語文（含兒童閱讀）、英語教學、兩性平等教育、藝術與人文、體驗學習」，作為本校課程發展重點，落實於課程規劃、學年活動、學校活動中進行；結合教學、行政、家長人力資源，進行各領域及六大議題教學活動。並針對校本課程，規劃下列活動及課程：快樂晨光英語、閱讀指導家長圖書館利用教育指導課程、藝術週活動、英語日活動、假日全校登山活動、假日教師進修活動、綠園琴韻心連心音樂會、外籍英語教師主題式繪本教學課程、青春向前行班級輔導活動等。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_604_9668310_17862.gif","_id":88,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yfes.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市北投區珠海路155號","o_tlc_agency_phone":"(02)2891-7433*141","o_tlc_agency_purpose":"不放棄任何一位孩子，讓每一位孩子擁有應有的價值","o_tlc_agency_email":"wzchen@yfes.tp.edu.tw","o_tlc_agency_name":"臺北市北投區義方國民小學","o_tlc_agency_fax":"(02)2892-7343","o_tlc_agency_admincategory":"","o_tlc_agency_service":"打造尊重關懷的教育環境提供卓越品質的教育內涵            落實公平正義的教育歷程 導引人盡其才的教育發展","o_tlc_agency_img_inner":"","_id":89,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"08：00-16：00","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.kdps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市北投區中央北路4段581號","o_tlc_agency_phone":"(02)2891-2847","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區關渡國民小學","o_tlc_agency_fax":"(02)2895-2910","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":90,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tuyes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_607_599551_82264.jpg","o_tlc_agency_address":"臺北市北投區中央北路3段40巷45號","o_tlc_agency_phone":"(02)2894-1208","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區桃源國民小學","o_tlc_agency_fax":"(02)2892-7164","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_607_6982429_82264.jpg","_id":91,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/web.spps.tp.edu.tw\/front\/bin\/home.phtml","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_609_529751_32198.jpg","o_tlc_agency_address":"臺北市北投區致遠二路80號","o_tlc_agency_phone":"(02)2822-7484","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區石牌國民小學","o_tlc_agency_fax":"(02)2826-5257","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_609_5935855_32198.jpg","_id":92,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.lnes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_610_5295063_98132.jpg","o_tlc_agency_address":"臺北市北投區立農街1段250號","o_tlc_agency_phone":"(02)2821-0702","o_tlc_agency_purpose":"推動國民小學義務教育工作，並配合臺北市政府教育局辦理各推廣活動","o_tlc_agency_email":"kuojong@cc.lnes.tp.edu.tw","o_tlc_agency_name":"臺北市北投區立農國民小學","o_tlc_agency_fax":"(02)2828-1743","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_610_4317697_98132.jpg","_id":93,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.cmps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_611_932735_86759.jpg","o_tlc_agency_address":"臺北市北投區洲美街185號","o_tlc_agency_phone":"(02)2831-3619","o_tlc_agency_purpose":"擁有健康強壯的體魄具備尊重關懷的品德養成正確良好的習慣建立終身受用的能力留下甜蜜美好的回憶　 　","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區洲美國民小學","o_tlc_agency_fax":"(02)2831-6084","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_611_5754578_86759.jpg","_id":94,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.mdes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_612_6026261_18023.jpg","o_tlc_agency_address":"臺北市北投區明德路190號","o_tlc_agency_phone":"(02)2822-9651","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區明德國民小學","o_tlc_agency_fax":"(02)2826-5417","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_612_7334781_18023.jpg","_id":95,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wles.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市北投區文林北路155號","o_tlc_agency_phone":"(02)2823-4212","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區文林國民小學","o_tlc_agency_fax":"(02)2823-5854","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":96,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.htes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_615_8323762_11756.jpg","o_tlc_agency_address":"臺北市北投區竹子湖路17之2號","o_tlc_agency_phone":"(02)2861-6963","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區湖田國民小學","o_tlc_agency_fax":"(02)2861-1704","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_615_6471637_11756.png","_id":97,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hses.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市北投區湖底路11號","o_tlc_agency_phone":"(02)2861-0148","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市北投區湖山國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":98,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"7"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hhups.tp.edu.tw","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_617_3069102_85175.jpg","o_tlc_agency_address":"臺北市內湖區環山路1段25號","o_tlc_agency_phone":"(02)2797-1267","o_tlc_agency_purpose":"學校願景：健康、主動、尊重、宏觀","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區西湖國民小學","o_tlc_agency_fax":"(02)2799-6184","o_tlc_agency_admincategory":"","o_tlc_agency_service":"1.營造知識管理與學習型校園，並期許利用雲端概念彙整教師研究與教學風華，藉由網路累積與分享；2.持續發展體育性社團，落實學生健康生活觀念；3.順應學校本位特色與師生專業優勢條件，提出以閱讀為主軸，推動E化教學、英語教學與生態教學之『三億旗艦、喜悅幸福』【三E齊進、喜閱西湖】計畫，期望緊扣學校願景與特色課程，培育具備未來幸福生活能力的西湖學子。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_617_3812199_85175.jpg","_id":99,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.whups.tp.edu.tw","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市內湖區文湖街15號","o_tlc_agency_phone":"(02)2658-3515","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區文湖國民小學","o_tlc_agency_fax":"(02)2799-4445","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":100,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.lnps.tp.eud.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_619_4823697_70544.jpg","o_tlc_agency_address":"臺北市內湖區港華街100號","o_tlc_agency_phone":"(02)2657-4158","o_tlc_agency_purpose":"麗山國小校訓：修己善群","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區麗山國民小學","o_tlc_agency_fax":"(02)2799-4484","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_619_2793113_70544.jpg","_id":101,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.thes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_631_8336411_28977.jpg","o_tlc_agency_address":"臺北市南港區興南街62號","o_tlc_agency_phone":"(02)2782-6531","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市南港區東新國民小學","o_tlc_agency_fax":"(02)2788-9935","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_631_5336659_28977.jpg","_id":112,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.bhps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_620_2649072_23123.jpg","o_tlc_agency_address":"臺北市內湖區金龍路100號","o_tlc_agency_phone":"(02)2790-7161","o_tlc_agency_purpose":"培育碧湖國小兒童成為擁有生活力、生命力、意志力的新世紀兒童：1.生活力：有解決日常生活問題的能力。2.生命力：熱愛生命、關愛他人。3.意志力：尋夢、追夢，為理想執著，勇往直前。","o_tlc_agency_email":"bhps@tp.edu.tw","o_tlc_agency_name":"臺北市內湖區碧湖國民小學","o_tlc_agency_fax":"(02)2794-6942","o_tlc_agency_admincategory":"","o_tlc_agency_service":"1.落實教學正常，使學生能快樂學習與健康成長 2.推動各科教學改革，強化教材教法之研究，提昇教師專業素養 及知能 3.辦理各項學藝活動，使學生潛能得以充分發揮，並延伸學習成效 4.加強科學教育，提昇學生對自然科學研究興趣及能力 5.落實藝能科教育，增進審美能力，陶冶優良情操 6.推展資訊教育，提昇教師及學生電腦知能，使人人能有效應用各種資訊 7.加強鄉土教學，陶冶愛家、愛鄉、愛國情操 8.推展英語教學，使學生具多元學習能力，並因應國際村的到來 9.美化教學環境，佈置和宜的學習情境，以達到境教的功能 10.建立多元的教學評量，塑造無挫折的學習歷程，使學生快樂的學習 11.規劃九年一貫課程，因應課程改革及社會的需求 12.辦理課後輔導，提供學生多元、多樣化的學習 13.充實教學設備，提供良好的學習設施，增進教學效果","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_620_8791089_86749.jpg","_id":102,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"週一至週五07:40~16:30","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.dhps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市內湖區大湖山莊街170號","o_tlc_agency_phone":"(02)2791-5870","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區大湖國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":103,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.klps.tp.edu.tw\/enable2007","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_622_4903385_96698.jpg","o_tlc_agency_address":"臺北市內湖區星雲街121號","o_tlc_agency_phone":"(02) 2790-1237","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區康寧國民小學","o_tlc_agency_fax":"(02) 2794-1809","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_622_118883_96531.jpg","_id":104,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.nhes.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市內湖區內湖路2段41號","o_tlc_agency_phone":"(02)2799-8085","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區內湖國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":105,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.shes.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市內湖區民權東路6段138號","o_tlc_agency_phone":"(02)2796-3721","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區新湖國民小學","o_tlc_agency_fax":"(02)2793-0050","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":106,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.tmes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_625_9082001_56084.jpg","o_tlc_agency_address":"臺北市內湖區新明路22號","o_tlc_agency_phone":"(02)2791-7334","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區潭美國民小學","o_tlc_agency_fax":"(02)2794-2271","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_625_7385653_56084.jpg","_id":107,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.dfps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_626_8965788_41191.jpg","o_tlc_agency_address":"臺北市內湖區東湖路115號","o_tlc_agency_phone":"(02)2633-9984","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區東湖國民小學","o_tlc_agency_fax":"(02)2633-4163","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_626_9249796_41191.jpg","_id":108,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.mhups.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市內湖區康寧路3段105號","o_tlc_agency_phone":"(02)2632-3477","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區明湖國民小學","o_tlc_agency_fax":"(02)2632-0173","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":109,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.lhes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_629_8183916_05614.jpg","o_tlc_agency_address":"臺北市內湖區金湖路363巷8號","o_tlc_agency_phone":"(02)2634-3888","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市內湖區麗湖國民小學","o_tlc_agency_fax":"(02)2634-3855","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_629_7991066_05614.jpg","_id":110,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"8"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yhes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_630_1658698_32953.jpg","o_tlc_agency_address":"臺北市南港區向陽路31號","o_tlc_agency_phone":"(02)2783-6049","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市南港區玉成國民小學","o_tlc_agency_fax":"(02)2788-1299","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_630_8375273_33230.jpg","_id":111,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ctps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_632_4669985_05848.jpg","o_tlc_agency_address":"臺北市南港區東新街65號","o_tlc_agency_phone":"(02)2785-1376","o_tlc_agency_purpose":"我們希望成德國小的每一位兒童是： 愛整潔  有禮貌  守秩序  重榮譽   勤讀書每一位教師能：關愛兒童   終身學習   多元教學  勇於創新  協同合作家長們都願意： 愛心奉獻  熱心參與  耐心引導  親師合作  成長學習行政團隊都可以做到： 主動敏捷   服務為先  品質第一   權變領導  和諧共榮","o_tlc_agency_email":"hikanty@yahoo.com.tw","o_tlc_agency_name":"臺北市南港區成德國民小學","o_tlc_agency_fax":"(02)2785-5253","o_tlc_agency_admincategory":"","o_tlc_agency_service":"如果說教育的起點是有教無類，過程是因材施教，終點是止於至善，那麼教育的核心應該在兒童；教育的骨幹應該在教師。學校同仁和全體家長強調教育的本質在「發展人性、培養人格、改善人生」。教育是要教導學生「學會學習、學會生存、學會生活、學會愛及與人相處的能力」 為了要達到上述目標，學校應該透過各種方法和策略，讓： ◎      每一個學生都能發揮它的潛能與善性， ◎      開拓他的心靈與智慧。 ◎      都能因為經過教育的洗禮而改變氣質，朝真、善、美的方向去發展。為了達到「溫馨、活力、卓越」的學校校願景，學校也應該透過各種方法和策略去： 形塑互尊互重的優質校園文化，每位師生員工因而能：彼此體諒、溫馨關懷。 規劃設計推展豐富多元的活動，每位師生員工因而能：激發潛能、展現活力。 體察世界變化脈絡，規劃適切課程，每位師生員工能：自我成長、追求卓越。經過上述的努力，我們希望成德國小顯現出來的具體指標是： ★      學校氣氛是互敬互重，彼此關懷，寧靜安祥、團結和諧。 ★      校園環境是整整齊齊、乾乾淨淨，四季花開，時時飄香。 ★      教師教學是認真、負責，並具有耐心。 ★      學生行為活潑而不輕佻，乖巧而不呆板，機伶卻不投機，純潔但不愚昧。 ★      每一個學生都具備有良好的基本學習能力。 ★      開口都能說得體合宜的話。 ★      提筆都能寫通順流利的文章。不但★      都具備基本的英語能力。 ★      和資訊知能。同時也★      都能妥善處理自己的情緒，成為一個樂觀進取、合群快樂的小天使。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_632_330339_05848.jpg","_id":113,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"＊週一至週五　　　上午05:00-06:30　　　下午17:30-21:00＊週六至週日　　　全天05:00-21:00 註： 歡迎社區居民使用，本校目前僅開放「學校操場」。　　 若您有任何問題，請聯絡總務處，TEL:2785-1376轉51","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.nkps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_633_3897456_59207.jpg","o_tlc_agency_address":"臺北市南港區惠民街67號","o_tlc_agency_phone":"(02)2783-4678","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市南港區南港國民小學","o_tlc_agency_fax":"(02)2788-1427","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_633_3194437_56703.jpg","_id":114,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.sdps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_634_9091509_27038.jpg","o_tlc_agency_address":"臺北市南港區東新街118巷86號","o_tlc_agency_phone":"(02)2788-0500","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市南港區修德國民小學","o_tlc_agency_fax":"(02)2785-0983","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_634_5651131_27038.jpg","_id":115,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.zzes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_635_4563601_10220.jpg","o_tlc_agency_address":"臺北市南港區舊莊街1段100號","o_tlc_agency_phone":"(02)2782-1418","o_tlc_agency_purpose":"本校於民國44年9月成立，教育宗旨務務使學生能快樂學習、活潑成長。","o_tlc_agency_email":"zzes2011@gmail.com","o_tlc_agency_name":"臺北市南港區舊莊國民小學","o_tlc_agency_fax":"(02)2653-0954","o_tlc_agency_admincategory":"","o_tlc_agency_service":"幼兒園、特教班、小學一至六年級普通班、成人教育班。","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_635_5185205_71482.jpg","_id":116,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"後山開放民眾活動時間：週一至週五下午４點放學後，週六、週日日間開放。","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hsps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_636_7509187_12148.jpg","o_tlc_agency_address":"臺北市南港區舊莊街1段1號","o_tlc_agency_phone":"(02)2782-4949","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市南港區胡適國民小學","o_tlc_agency_fax":"(02)2788-2813","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_636_7870973_12148.jpg","_id":117,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"4"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.yjps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_637_918696_26434.jpg","o_tlc_agency_address":"臺北市文山區試院路2號","o_tlc_agency_phone":"(02)2236-3855","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區永建國民小學","o_tlc_agency_fax":"(02)2236-6024","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_637_7894520_26833.jpg","_id":118,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.mjes.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區木柵路3段191號","o_tlc_agency_phone":"(02)2939-1234","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區木柵國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":119,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.mdps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區木柵路2段138巷61號","o_tlc_agency_phone":"(02)2939-2821","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區明道國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":120,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.es.nccu.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區指南路3段12號","o_tlc_agency_phone":"(02)2939-3610","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"國立政治大學附設實驗國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":121,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wnses.tp.edu.tw","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_643_8096439_78163.jpg","o_tlc_agency_address":"臺北市文山區秀明路2段114號","o_tlc_agency_phone":"(02)2938-1721","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區萬興國民小學","o_tlc_agency_fax":"(02)2939-7813","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_643_3520699_78216.jpg","_id":122,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wfes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_644_1497982_70847.jpg","o_tlc_agency_address":"臺北市文山區萬和街1號","o_tlc_agency_phone":"(02)2230-1232，2230-3855","o_tlc_agency_purpose":"健康、快樂、成長","o_tlc_agency_email":"wfes@wfes.tp.edu.tw","o_tlc_agency_name":"臺北市文山區萬芳國民小學","o_tlc_agency_fax":"(02)2230-1009，2230-4942","o_tlc_agency_admincategory":"","o_tlc_agency_service":"提供優質小學教育","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_644_317885_80247.jpg","_id":123,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.bjps.tp.edu.tw","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_645_3467164_54509.jpg","o_tlc_agency_address":"臺北市文山區木柵路4段159巷14-1號","o_tlc_agency_phone":"(02)2230-2585","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區博嘉國民小學","o_tlc_agency_fax":"(02)2230-0430","o_tlc_agency_admincategory":"","o_tlc_agency_service":"校園運動場除上課時間外全日開放圖書室開放周一至周五08:00~16:00","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_645_1241683_54509.jpg","_id":124,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.lsps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_646_8383307_31890.jpg","o_tlc_agency_address":"臺北市文山區木新路3段155巷7號","o_tlc_agency_phone":"(02)2936-3995","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區力行國民小學","o_tlc_agency_fax":"(02)2936-6055","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_646_8685049_31890.jpg","_id":125,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.zjps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區忠順街1段4號","o_tlc_agency_phone":"(02)2936-0725","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區實踐國民小學","o_tlc_agency_fax":"(02)2936-3349","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":126,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.cmes.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_649_8417090_78426.jpg","o_tlc_agency_address":"臺北市文山區景文街108號","o_tlc_agency_phone":"(02)2932-2151","o_tlc_agency_purpose":"健康  活力  創新  希望","o_tlc_agency_email":"cmesit@ms1.cmes.tp.edu.tw","o_tlc_agency_name":"臺北市文山區景美國民小學","o_tlc_agency_fax":"(02)2933-2155","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_649_8613119_78426.jpg","_id":127,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.jcps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區景福街21巷5號","o_tlc_agency_phone":"(02)2932-3875","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區志清國民小學","o_tlc_agency_fax":"(02)2933-2021","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":128,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.skps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_651_9647396_45826.jpg","o_tlc_agency_address":"臺北市文山區景福街225號","o_tlc_agency_phone":"(02)2935-0955","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區溪口國民小學","o_tlc_agency_fax":"(02)2934-7444","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_651_2435756_15015.jpg","_id":129,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wfps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區羅斯福路5段170巷32號","o_tlc_agency_phone":"(02)2935-3123","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區萬福國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":130,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.wkps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區興隆路1段68號","o_tlc_agency_phone":"(02)2931-4360","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區武功國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":131,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.chps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_654_2749871_75288.jpg","o_tlc_agency_address":"臺北市文山區景華街150巷21號","o_tlc_agency_phone":"(02)2932-9438","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區景興國民小學","o_tlc_agency_fax":"(02)2931-2161","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_654_3842645_75134.jpg","_id":132,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hdps.tp.edu.tw\/","o_tlc_agency_img_front":"","o_tlc_agency_address":"臺北市文山區興隆路2段235號","o_tlc_agency_phone":"(02)2932-9431","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區興德國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"","_id":133,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hlps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_657_5392837_82523.jpg","o_tlc_agency_address":"臺北市文山區福興路2號","o_tlc_agency_phone":"(02)2932-3131","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區興隆國民小學","o_tlc_agency_fax":"(02)2930-4341","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_657_236936_82523.jpg","_id":134,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/tw.school.uschoolnet.com\/?id=es00000113","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_658_4913353_71249.jpg","o_tlc_agency_address":"臺北市文山區辛亥路4段103號","o_tlc_agency_phone":"(02)2935-7282","o_tlc_agency_purpose":"愛,學習,傳承","o_tlc_agency_email":"saes@tp.edu.tw","o_tlc_agency_name":"臺北市文山區辛亥國民小學","o_tlc_agency_fax":"(02)2935-7287","o_tlc_agency_admincategory":"","o_tlc_agency_service":"（一）推動深耕閱讀計畫（二）積極推動藝術與人文教育（三）進行創意英語教學活動（四）健康促進活動（五）深耕武術教學（六）推動安全學校（七）教學環境暨教學設備改善（八）辦理親職教育相關活動（九）推動友善校園輔導相關活動","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_658_1040758_71249.jpg","_id":135,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"學生在校上課時間","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.hhps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_659_4072188_80519.jpg","o_tlc_agency_address":"臺北市文山區興隆路3段125巷6號","o_tlc_agency_phone":"(02)2239-3070","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市文山區興華國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_659_4096171_80519.jpg","_id":136,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"1"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"http:\/\/www.ssps.tp.edu.tw\/","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_667_675042_78278.jpg","o_tlc_agency_address":"臺北市松山區八德路4段746號","o_tlc_agency_phone":"(02)2767-2907","o_tlc_agency_purpose":"","o_tlc_agency_email":"","o_tlc_agency_name":"臺北市松山區松山國民小學","o_tlc_agency_fax":"(02)2767-9449","o_tlc_agency_admincategory":"","o_tlc_agency_service":"","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_667_5655498_78278.jpg","_id":137,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"","o_tlc_agency_region":"9"},{"o_tlc_agency_categorychild":"小學","o_tlc_agency_link":"黑快馬測試1","o_tlc_agency_img_front":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_674_8102257_94370.png","o_tlc_agency_address":"台北市中正區忠孝東路二段94號4樓","o_tlc_agency_phone":"","o_tlc_agency_purpose":"黑快馬測試1","o_tlc_agency_email":"jerry_chen@heimavista.com","o_tlc_agency_name":"(測試資料)黑快馬國民小學","o_tlc_agency_fax":"","o_tlc_agency_admincategory":"","o_tlc_agency_service":"黑快馬測試1","o_tlc_agency_img_inner":"https:\/\/www.lct.tp.edu.tw\/ezfiles\/1\/1001\/agency\/1\/agency_674_226318_94370.png","_id":138,"o_tlc_agency_category":"1","o_tlc_agency_opentime":"黑快馬測試1","o_tlc_agency_region":"11"}]}}
    );
    res.end();
});







