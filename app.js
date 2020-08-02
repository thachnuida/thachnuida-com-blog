require('dotenv').config();

//1.
var http = require('http');
 
//2.
var credentials = {
    userName: process.env.USERNAME,
    password: process.env.PASSWORD
};
var realm = 'Basic Authentication';
 
//3.
function authenticationStatus(resp) {
    resp.writeHead(401, { 'WWW-Authenticate': 'Basic realm="' + realm + '"' });
    resp.end('Authorization is needed');
 
};
 
//4.
var server = http.createServer(function (request, response) {
    var authentication, loginInfo;
 
    //5.
    if (!request.headers.authorization) {
        authenticationStatus (response);
        return;
    }
 
    //6.
    authentication = request.headers.authorization.replace(/^Basic/, '');
 
    //7.
    authentication = (new Buffer(authentication, 'base64')).toString('utf8');
 
    //8.
    loginInfo = authentication.split(':');
 
    //9.
    if (loginInfo[0] === credentials.userName && loginInfo[1] === credentials.password) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      var exec = require('child_process').exec;
      exec('npm run generate', function(error, stdout, stderr) {
        response.end(stdout);
      });
    }
    authenticationStatus (response);
 
});
 
//10.
server.listen();