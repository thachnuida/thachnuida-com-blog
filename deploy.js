var spawn = require('child_process').spawn;
var simpleGit = require('simple-git')();
var fs = require('fs');
var logStream = fs.createWriteStream('./update.txt', {flags: 'w'});
var config = require('./deploy.config');
var request = require('request');

function generateHtml(cb) {
  var generate = spawn(process.env.comspec, ['/c', 'hexo', 'generate']);
  var updateList = '';

  // Log to file
  generate.stdout.pipe(logStream);
  generate.stderr.pipe(logStream);

  generate.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  generate.stderr.on('data', function(data) {
    console.log(data.toString());
  });

  generate.on('close', function(code) {
    console.log('Generate html finish with code', code);
    if (!code) cb && cb(null);
    else {
      console.log('There is an error when generating htmls');
      cb && cb('error');
    }
  });
}

function serverUpdate() {
  request({
    uri: config.deployUrl,
    method: "GET",
  }, function(error, response, body) {
    console.log(body);
    console.log('Server updated.');
  });
}


////////////////
generateHtml(function(err, updateList) {
  if (!err) {
    // Commit code
    simpleGit.add('.', function() {
      simpleGit.commit('update', function() {
        simpleGit.push('origin', 'master', function() {
          // Call server update
          serverUpdate();
        });
      });
    });
  }
});

// serverUpdate();
