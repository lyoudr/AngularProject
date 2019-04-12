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
        { $push: { goodcount : `${ replaycomment }`}}
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
        res.json({title: result[0].theme , content: result[0].content, comments: result[0].comments, id: result[0]._id});
    } else if (id == '5c9c28185b02ca014a81ec17') {
        res.json({title: result[1].theme , content: result[1].content, comments: result[1].comments, id: result[1]._id});
    } else if (id == '5c9c28185b02ca014a81ec18') {
        res.json({title: result[2].theme , content: result[2].content, comments: result[2].comments, id: result[2]._id});
    } else if (id == '5c9c28185b02ca014a81ec19') {
        res.json({title:result[3].theme, content: result[3].content, comments: result[3].comments, id: result[3]._id});
    } else if (id == '5c9c28185b02ca014a81ec1a') {
        res.json({title:result[4].theme, content: result[4].content, comments: result[4].comments, id: result[4]._id});
    } else if (id == '5c9c28185b02ca014a81ec1b') {
        res.json({title:result[5].theme, content: result[5].content, comments: result[5].comments, id: result[5]._id});
    } else if (id == '5c9c28185b02ca014a81ec1c') {
        res.json({title:result[6].theme, content: result[6].content, comments: result[6].comments, id: result[6]._id});
    } else if (id == '5c9c28185b02ca014a81ec1d') {
        res.json({title:result[7].theme, content: result[7].content, comments: result[7].comments, id: result[7]._id});
    } else if (id == '5c9c28185b02ca014a81ec1e') {
        res.json({title:result[8].theme, content: result[8].content, comments: result[8].comments, id: result[8]._id});
    } else if (id == '5ca0607648c68a039e343eec') {
        res.json({title:result[9].theme, content: result[9].content, comments: result[9].comments, id: result[9]._id});
    }
});

/*3.3 Classic Post */
server.post('/classic/submitform', middleware.checkToken, (req, res)=>{
    console.log('新增的貼文是 =>',req.body); 
    var insertsingleDoc = function(db, callback) {
        db.collection('classicinfo').insertOne(
            req.body, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            callback(result);
        })
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
                { name : "咚咚餐廳", price : "100 ~ 200 TWD", comment: "好吃甜甜的", img : "assets/img/restaurant/restaurant-1.jpg" },
                { name : "哈摟餐廳", price : "300 ~ 600 TWD", comment: "好棒", img : "assets/img/restaurant/restaurant-2.jpg" },
                { name : "每每餐廳", price : "600 ~ 944 TWD", comment : "吃起來不錯", img : "assets/img/restaurant/restaurant-3.jpg" },
                { name : "美麗餐廳", price : "500 ~ 1200 TWD", comment : "一定要來吃", img : "assets/img/restaurant/restaurant-4.jpg" }
            ])
            console.log('sweet');
        }
    } else if (classification == "righteous") {
        if ( page == 1) {
            res.json([
                { name : "義大餐廳", price : "400 ~ 700 TWD", comment: "好吃鹹鹹的", img : "assets/img/restaurant/restaurant-1.jpg" },
                { name : "樂樂餐廳", price : "500 ~ 600 TWD", comment: "有很多生菜, 不好吃", img : "assets/img/restaurant/restaurant-2.jpg" },
                { name : "您好餐廳", price : "600 ~ 900 TWD", comment : "我喜歡它的米飯", img : "assets/img/restaurant/restaurant-3.jpg" },
                { name : "安安餐廳", price : "500 ~ 800 TWD", comment : "義大利麵好吃", img : "assets/img/restaurant/restaurant-4.jpg" }
            ])
            console.log('righteous');
        }
    } else if (classification == "chinese") {
        if ( page == 1) {
            res.json([
                { name : "武道餐廳", price : "304 ~ 850 TWD", comment: "很有中國味", img : "assets/img/restaurant/restaurant-1.jpg" },
                { name : "湯包餐廳", price : "100 ~ 220 TWD", comment: "湯包好吃", img : "assets/img/restaurant/restaurant-2.jpg" },
                { name : "享用餐廳", price : "230 ~ 340 TWD", comment : "吃起來不錯", img : "assets/img/restaurant/restaurant-3.jpg" },
                { name : "素菜餐廳", price : "800 ~ 1000 TWD", comment : "菜菜好吃喔", img : "assets/img/restaurant/restaurant-4.jpg" }
            ])
            console.log('chinese');
        }
    }
})







