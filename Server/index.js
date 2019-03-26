const express = require('express');
const server = express();
const cors = require('cors');
const fs = require('fs');
const Accountlist = require('./account.js');
const Stores = require('./store.js');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

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
          let token = jwt.sign({username: username},
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
  /*3.1 Classic */
  server.get('/classicDiscuss', middleware.checkToken, (req, res)=>{
    let page = req.query.page;
    if(page == 1) {
        res.json([
            {
                index: "1",
                rank: "1",
                theme: "貝多芬",
                author: "小米",
                date: "2018.04.24",
                good: "6",
                content: "生平1"
            },
            {
                index: "2",
                rank: "2",
                theme: "莫札特",
                author: "小康",
                date: "2018.03.19",
                good: "6",
                content: "生平1"
            },
            {
                index: "3",
                rank: "3",
                theme: "海頓",
                author: "小名",
                date: "2018.09.03",
                good: "6",
                content: "生平1"
            },
            {
                index: "4",
                rank: "4",
                theme: "斯伯特",
                author: "嗨嗨",
                date: "2018.05.21",
                good: "6",
                content: "生平1"
            },
            {
                index: "5",
                rank: "5",
                theme: "巴哈",
                author: "哈哈狗",
                date: "2018.12.23",
                good: "6",
                content: "生平1"
            },
            {
                index: "6",
                rank: "6",
                theme: "徹爾尼",
                author: "棒棒",
                date: "2018.02.09",
                good: "6",
                content: "生平1"
            },
            {
                index: "7",
                rank: "7",
                theme: "李斯特",
                author: "小美",
                date: "2018.04.24",
                good: "6",
                content: "生平1"
            },
            {
                index: "8",
                rank: "8",
                theme: "蕭邦",
                author: "周周",
                date: "2018.09.20",
                good: "6",
                content: "生平1"
            },
            {
                index: "9",
                rank: "9",
                theme: "米米",
                author: "笨笨",
                date: "2018.06.04",
                good: "6",
                content: "生平1"
            },
        ])
    } else if (page == 2){
        res.json(Stores.store2)
    } else if (page == 3) {
        res.json(Stores.store3)
    }
    res.end();
  }); 

  /*3.2 Classic Information */
  server.get('/classicInfo', middleware.checkToken, (req, res) =>{
    let id = req.query.id;
    if(id == 1){
        res.json({title:"貝多芬",content: "一七七０年，貝多芬生於德國波昂的音樂世家，祖父是波昂宮廷樂長，父親是宮廷樂團的男高音歌手。因此，貝多芬年幼時就由父親教他彈鋼琴，七歲就能登台演奏了。正如莫札特的父親一般，貝多芬的父親很快地也發現兒子的天分，並儘可能在每一個場合中秀給大家看。但家家有本難唸的經，貝多芬的母親有段時間酗酒，而貝多芬的父親在晚年也遭遇相同的問題，這樣的家庭背景造就了不論在個性或音樂上都獨樹一格，但也為後來他的酗酒成性肇下了禍根。貝多芬天資聰穎，很快地父親就無能為力了，於請樂團的朋友來教兒子，不過真正啟蒙的老師，是宮廷樂長倪富，是從萊比錫來的名作曲家，除了鋼琴和管風琴，還教貝多芬作曲。十六歲時為了和崇拜的莫札特見面，而前往音樂之都維也納。雖然莫札特對貝多芬的即興演奏相當佩服，但是卻因為太忙而不能收貝多芬作學生．沒多久父親酗酒的情況更加嚴重了，被迫退休，於是貝多芬開始工作，賺錢養家。"})
    } else if (id == 2) {
        res.json({title:"莫札特", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    } else if (id == 3) {
        res.json({title:"海頓", content: "海頓出生於奧地利和匈牙利邊境的小村莊羅勞、一個貧窮的車匠家庭中。海頓5，6歲時，被送到海茵堡附近的親戚家，接受教堂唱詩班訓練。1740年，在當時維也納的斯蒂芬大教堂音樂總監喬治‧羅伊特爾下鄉選苗子的時候被相中。羅伊特爾把海頓帶到了維也納，在其後的9年裡海頓學習唱歌、鋼琴和小提琴。離開合唱團後，經過10年艱苦的自由音樂人生涯，海頓寫出了他的第一首四重奏和第一首歌劇。"})
    } else if (id == 4) {
        res.json({title:"斯伯特", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    } else if (id == 5) {
        res.json({title:"巴哈", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    } else if (id == 6) {
        res.json({title:"徹爾尼", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    } else if (id == 7) {
        res.json({title:"李斯特", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    } else if (id == 8) {
        res.json({title:"蕭邦", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    } else if (id == 9) {
        res.json({title:"米米", content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"})
    }
  });

/* Connect to MogoDB Database */
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  removeDocuments(db, function() {
    findDocuments(db, function() {
        db.close();
    });
  });
});

//Insert a Document
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("result is=>", result);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

//Find Document
var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log("Founded docs is =>",docs);
      callback(docs);
    });
}

//Remove a Document
var removeDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteMany({}, function(err, result) {
        assert.equal(err, null);
        //assert.equal(1, result.result.n);
        console.log("Removed all the document");
        callback(result);
    });    
}