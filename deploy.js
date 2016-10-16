var spawn = require('child_process').spawn;
var simpleGit = require('simple-git')();

function generateHtml(cb) {
  var generate = spawn(process.env.comspec, ['/c', 'hexo', 'generate']);

  generate.stdout.on('data', function (data) {
    var output = data.toString();
    console.log(output);
  });

  generate.on('exit', function(code) {
    console.log('Generate html finish with code', code);
    cb && cb();
  });
}

function generateUpdateList() {
  simpleGit.status(function(err, data) {
    console.log(data);
  });
}



generateHtml();