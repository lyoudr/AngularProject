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
server.use(express.static('../Zimi/dist'));

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
    fs.readFile('../Zimi/dist/index.html', function (err, data) { 
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
server.get('/storeInfo',(req, res) =>{
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
server.post('/register',(req, res)=>{
    let received = req.body;
    console.log('body is =>', received);
    res.send({
        status: "SUCCESS"
    })
});

/* Search Stores */
server.get('/searchstores', (req, res)=>{
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
