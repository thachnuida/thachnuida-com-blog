var spawn = require('child_process').spawn;
var simpleGit = require('simple-git')();
var fs = require('fs');
var logStream = fs.createWriteStream('./update.txt', {flags: 'a'});

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


////////////////
generateHtml(function(err, updateList) {
  if (!err) {
    // console.log(updateList);
  }
});
