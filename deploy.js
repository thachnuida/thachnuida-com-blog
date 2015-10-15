var spawn = require('child_process').spawn;
var timer;
var waitingTime = 15000;
var startTime = new Date().getTime();

function deploy() {
  console.log('Deploying...');
  var deployCmd = spawn(process.env.comspec, ['/c', 'hexo', 'deploy']); // Deploy in window

  deployCmd.stdout.on('data', function (data) {
    var output = data.toString();
    console.log(output);
    if (timer) {
      clearTimeout(timer);
    }

    if (output.indexOf('--------') != -1) {
      waitingTime = 60000;
    } else {
      waitingTime = 15000;
    }

    timer = setTimeout(function() {
      deployCmd.stdin.pause();
      deployCmd.kill();
      console.log('DEPLOY Wait so long, so restart....');
      deploy();
    }, waitingTime);

    if (output.indexOf('Deploy done') != -1) {
      console.log('DEPLOY DONE');
      console.log('Done in ', new Date().getTime() - startTime, 'ms');
      process.exit();
    };

  });

  deployCmd.stderr.on('data', function(data) {
    console.log(data.toString());
    console.log('Redeploying...');    
    deploy();
  });

  deployCmd.on('exist', function(code) {
    console.log('child process exited with code ' + code);
  });
}



deploy();
