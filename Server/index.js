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

/* Connection URL */
var url = 'mongodb://localhost:27017/myproject';

/* Method */
//(1) Insert a Document
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('classicinfo');
  // Insert some documents
  collection.insertMany([
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
      }
  ], function(err, result) {
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
    });
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
    });
}; // end of getDataFromCollection

/*3.1 Classic */
server.get('/classicDiscuss', middleware.checkToken, async (req, res) =>{
    let page = req.query.page;
    if(page == 1){
        let dbInstance = await getDBInstance(url);
        let result = await GetData(dbInstance, 'classicinfo');
        console.log('結果是 =>', result[0].theme);
        res.json(result);

    /*res.json([
        {
            index: "1",
            rank: "1",
            theme: "貝多芬",
            author: "小米",
            date: "2018-04-24",
            good: "2",
            content: "一七七０年，貝多芬生於德國波昂的音樂世家，祖父是波昂宮廷樂長，父親是宮廷樂團的男高音歌手。因此，貝多芬年幼時就由父親教他彈鋼琴，七歲就能登台演奏了。正如莫札特的父親一般，貝多芬的父親很快地也發現兒子的天分，並儘可能在每一個場合中秀給大家看。但家家有本難唸的經，貝多芬的母親有段時間酗酒，而貝多芬的父親在晚年也遭遇相同的問題，這樣的家庭背景造就了不論在個性或音樂上都獨樹一格，但也為後來他的酗酒成性肇下了禍根。貝多芬天資聰穎，很快地父親就無能為力了，於請樂團的朋友來教兒子，不過真正啟蒙的老師，是宮廷樂長倪富，是從萊比錫來的名作曲家，除了鋼琴和管風琴，還教貝多芬作曲。十六歲時為了和崇拜的莫札特見面，而前往音樂之都維也納。雖然莫札特對貝多芬的即興演奏相當佩服，但是卻因為太忙而不能收貝多芬作學生．沒多久父親酗酒的情況更加嚴重了，被迫退休，於是貝多芬開始工作，賺錢養家。"
        },
        {
            index: "2",
            rank: "2",
            theme: "莫札特",
            author: "小康",
            date: "2018-03-19",
            good: "6",
            content: "莫札特（1756－1791）從誕生的那一刻起便沉浸在音樂聲中。父親利奧波德(Leopold)是奧地利薩爾茲堡的宮廷小提琴家及作曲家，同時也是音樂教師。整個白天，莫札特在家裡都聽得見利奧波德教琴的聲音。1759年，7歲的姊姊瑪麗雅．安娜(Maria Anna)開始跟著父親學鋼琴，她極具潛力，並且日夜不斷練習。莫札特迷上了她彈奏的那些簡單曲子，跟著哼唱；有時候甚至會坐在家裡的大鍵琴前，模仿姊姊彈奏。利奧波德很快就發現兒子天賦異稟。以3歲小孩來說，他對樂曲的記憶力驚人，音感更是絕對，重點是那時還沒有人教過他。"
        },
        {
            index: "3",
            rank: "3",
            theme: "海頓",
            author: "小名",
            date: "2018-09-03",
            good: "10",
            content: "海頓出生於奧地利和匈牙利邊境的小村莊羅勞、一個貧窮的車匠家庭中。海頓5，6歲時，被送到海茵堡附近的親戚家，接受教堂唱詩班訓練。1740年，在當時維也納的斯蒂芬大教堂音樂總監喬治‧羅伊特爾下鄉選苗子的時候被相中。羅伊特爾把海頓帶到了維也納，在其後的9年裡海頓學習唱歌、鋼琴和小提琴。離開合唱團後，經過10年艱苦的自由音樂人生涯，海頓寫出了他的第一首四重奏和第一首歌劇。"
        },
        {
            index: "4",
            rank: "4",
            theme: "舒伯特",
            author: "嗨嗨",
            date: "2018-05-21",
            good: "5",
            content: "因為父親是音樂家，舒伯特在短短31年的生命中，創作了600多首歌曲，18部歌劇、歌唱劇和配劇音樂，10部交響曲，19首弦樂四重奏，22首鋼琴奏鳴曲，4首小提琴奏鳴曲。
                      舒伯特為不少詩人如約翰·沃爾夫岡·歌德、弗里德里希·席勒、海因里希·海涅、威爾赫姆·穆勒等的作品寫了大量歌曲，把音樂與詩歌緊密結合在一起。他的歌曲中既有抒情曲、敘事曲、充滿戰鬥性的愛國歌曲，也有源於民間音樂的歌曲，其中重要的有《魔王》、《鱒魚》、《菩提樹》、《美麗的磨坊女》、《野玫瑰》、《流浪者》（2首）、《普羅米修斯》、《致音樂》、《迷娘之歌》、《紡車旁的格麗卿》、《牧童的哀歌》、《戰鬥中的祈禱》、《劍之歌》、《戰士之歌》等 ， 連篇歌曲集3部 ：《美麗的磨坊女》、《冬之旅》和《天鵝之歌》。他的交響曲中較重要有第四、第五、第八、第九交響曲，其中第八交響曲是一部浪漫主義抒情交響曲，因只寫了兩個樂章而稱為《未完成交響曲》，第九交響曲氣勢磅礴，充滿英勇豪邁的氣概，稱為《偉大交響曲》。他的作品還有d小調弦樂四重奏《死與少女》、鋼琴五重奏《鱒魚》、C大調弦樂五重奏、鋼琴曲《流浪者幻想曲》、《音樂的瞬間》、降E大調即興曲、A大調奏鳴曲和配劇音樂《羅莎蒙德》等。舒伯特以抒情的旋律聞名，而且總是能夠自然流露、渾然天成。"
        },
        {
            index: "5",
            rank: "5",
            theme: "巴哈",
            author: "哈哈狗",
            date: "2018-12-23",
            good: "9",
            content: "巴哈一生多產，除了歌劇，幾乎涉獵了當時所有的曲式，包含清唱劇（教會用和世俗用，也包含受難曲與神劇）、經文歌、彌撒、聖詠、各式的獨奏曲、組曲、室內樂及協奏曲等等。巴哈將對樂器的體會與各種曲式結合，在超過40年的創作生涯寫出許多豐富多彩的樂曲；他的作品編號（BWV）也隨近代的不斷發掘而擴充，目前已增至BWV 1163。
            巴哈出生於神聖羅馬帝國（今德國中部圖林根州）小城埃森納赫(Eisenach)的一個音樂世家，自幼即接受音樂教育，父母亡故後又到奧德洛夫和呂內堡修習學業。畢業後巴哈先後在阿恩施塔特和慕豪森擔任管風琴師（1703～1708年），往後巴哈的職涯歷經威瑪（1708～1717年）、柯騰（1717～1723年）與萊比錫（1723～1750年）。
            儘管他的音樂沒有開創新風格，但他的創作使用了豐富的德國音樂風格和嫻熟的複調技巧。他的音樂集成了巴洛克音樂風格的精華。但由於音樂的風尚迅速轉向為洛可可和古典主義風格，巴哈的複調音樂在其死後被視為陳腐之物，其成就長時間未得到應有的評價，僅僅作為管風琴演奏家而聞名。
            雖然莫札特、貝多芬等大作曲家均對巴哈崇拜有加，但直到浪漫主義時代，作曲家孟德爾頌於1829年在柏林改編並指揮巴哈的《馬太受難曲》，震驚了音樂界。此後孟德爾頌對他的作品進行了發掘、整理和推廣，經過幾代音樂家的共同努力，巴哈逐漸恢復了崇高的地位。"
        },
        {
            index: "6",
            rank: "6",
            theme: "徹爾尼",
            author: "棒棒",
            date: "2018-02-09",
            good: "8",
            content: "卡爾·徹爾尼出生於維也納，原籍波西米亞的家庭，他的父親（Václav Czerny）也是鋼琴家。徹爾尼從小跟隨父親、胡梅爾（Johann Nepomuk Hummel，1778-1837）和薩列里（Antonio Salieri，1750-1825）學習鋼琴，父親在徹爾尼3歲時就開始教他J.S.巴赫、莫扎特和克萊門蒂的作品。7歲時徹爾尼能將自己的樂思記錄下來，9歲就登台演奏莫扎特的C小調鋼琴協奏曲，10歲時徹爾尼已能清晰流暢地彈奏莫扎特、克萊門蒂的全部鋼琴作品，並且具有超凡的音樂記憶力。從15歲起就開始了鋼琴教師的生涯。
            1801年，年僅10歲的徹爾尼去見貝多芬（Ludwig van Beethoven，1770-1827），貝多芬被徹爾尼精彩的演奏所打動，接受了這位學生。徹爾尼師從貝多芬學鋼琴並受當時著名鋼琴作曲家克萊門蒂（Muzio Clementi，1752-1832）和胡梅爾（Johann Nepomuk Hummel，1778-1837）的影響，鑽研他們的教學法，徹爾尼曾參加了克萊門蒂在維也納的授課。 徹爾尼是貝多芬最得意的學生，貝多芬曾在1801年—1803年的三年間免費教他彈奏鋼琴，徹爾尼也是貝多芬侄子卡爾的鋼琴教師。"
        },
        {
            index: "7",
            rank: "7",
            theme: "李斯特",
            author: "小美",
            date: "2018-04-24",
            good: "20",
            content: "李斯特出生於奧地利東部名為萊丁的村莊；父親是匈牙利人，母親是奧地利的日耳曼族人，因此他有兩個名字，分別是匈牙利和奧地利德語兩種拼法。他從小隨母親說德語，直到晚年才學會用匈牙利文寫作。匈牙利人自詡為歐洲唯一的有色人種，他們的姓名排列也和其他歐洲人不同：姓在前，名在後。
            李斯特的父親是一位業餘音樂家，他5歲時由父親教會彈奏鋼琴，8歲時開始作曲，9歲登台表演，獲得匈牙利貴族資助赴維也納學習，師從著名鋼琴教育家卡爾·徹爾尼，他曾說：「我的一切都是徹爾尼教我的。」貝多芬曾聽其演奏，並親吻其額頭。1823年全家遷居巴黎，1824年在巴黎首次公演獲得成功。
            1835年他和達爾古特伯爵夫人到日內瓦同居，1840年分手，伯爵夫人為他生了三個孩子，其中一個女兒後來嫁給華格納。分手原因是李斯特要為伯恩貝多芬墓地修繕籌資而進行歐洲巡迴演出，伯爵夫人帶著孩子回到巴黎。1843年李斯特擔任魏瑪大公的宮廷樂長，1848年他又和俄國親王王妃莎茵-維根斯坦同居，並成為貴族，改名為弗蘭茲·馮·李斯特。1861年赴羅馬，為了不和王妃結婚，1865年李斯特自霍恩洛厄樞機手下接受了剃髮禮出家成為天主教神職人員，之後逐漸升等到了輔祭品，但仍然身著神父的黑袍在德國、奧地利、匈牙利和義大利各處奔走授課，並分文不取，扶助了許多年輕音樂家，如葛利格、德彪西、鮑羅丁等，為普及音樂作出了相當大的貢獻。"
        },
        {
            index: "8",
            rank: "8",
            theme: "蕭邦",
            author: "周周",
            date: "2018-09-20",
            good: "11",
            content: "蕭邦父親是法國人，母親是波蘭人，真實出生日期目前仍有爭議，其拉丁文出生文獻（出生證明和教堂受洗紀錄）上記載為1810年2月22日，但其父母與家人均以3月1日作為蕭邦生日，目前音樂史學界的考證，傾向3月1日為其正確出生日期，而2月22日為當的父親在報戶口時，誤算了出生週數所致（比實際出生日期提早整整一星期）。蕭邦自幼喜愛波蘭民族音樂，7歲時就創作了波蘭舞曲，8歲登台演出，不足20歲已出名。蕭邦39歲時因病、情而自裁英年早逝，後半生主要生活在法國，創作了大量鋼琴作品，如4部敘事曲、十餘部波蘭舞曲包括《軍隊》、《英雄》，26首鋼琴前奏曲包括《雨滴》，27首鋼琴練習曲包括《離別》、《革命》，4部諧謔曲、4部即興曲、3部鋼琴奏鳴曲，至少21首多夜曲，59首馬祖卡，兩首鋼琴協奏曲、幻想曲、大提琴奏鳴曲和搖籃曲等。蕭邦一生的創作大多是鋼琴曲，被譽為「鋼琴詩人」和「鋼琴之神」。"
        },
        {
            index: "9",
            rank: "9",
            theme: "米米",
            author: "笨笨",
            date: "2018-06-04",
            good: "13",
            content: "哈哈哈"
        },
    ])*/
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
  







