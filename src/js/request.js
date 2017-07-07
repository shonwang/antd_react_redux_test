// const http = require('http');
// const url = require('url');
// const querystring = require('querystring');

// var urlObj = url.parse("http://local.center.ksyun.com/channelManager/domain/getChannelManager");

// var options = {
//     hostname: urlObj.host,
//     port: 80,
//     method: 'POST',
//     path: urlObj.path,
//     headers: {
//         'Cookie': 'pgv_pvi=7049027584; OUTFOX_SEARCH_USER_ID_NCOO=1255454549.106738; Hm_lvt_ac5eba1e1ee5d595c1528f6e345d4c38=1479199310,1480659371; regionType=basic; regionKey=cn-shanghai-2; RMA=%7B%220%22%3A0%7D; skin=themes%2Fdefault; menu_Active=16120802%2C16120814; trackId=1482824794038.291749; _ga=GA1.2.1734253259.1421654033; gate_way_cookie=47bfe1455bc64c6788096b1678a9e202',
//     }
// };

// var req = http.request(options, function(res) {
//     console.log('STATUS:', res.statusCode);
//     console.log('HEADERS:', JSON.stringify(res.headers))

//     res.setEncoding('utf8');
//     res.on('data', function(chunk) {
//         console.log(chunk);
//     });
// });

// var postData = JSON.stringify({ "domain": null, "type": null, "protocol": null, "cdnFactory": null, "auditStatus": null, "topologyId": null, "currentPage": 1, "pageSize": 10 });
// req.write(postData);
// req.end();

//var process = require('process');

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write('data: ', chunk);
//   }
// });

// process.stdin.on('end', function() {
//   process.stdout.write('end');
// });

var obj = {};  
console.log(obj);  
obj.foo = 'bar'