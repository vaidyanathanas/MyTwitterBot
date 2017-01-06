var Twitter = require('twit');
var T = new Twitter({
  consumer_key: 'k8OlA6gzTY2PUj4LXjeYvcGAQ',
  consumer_secret: 'PHZJYcahOM9ocoUilCwdsfdsfvegopBtleMlGAVRtddAPBBSqjdsfdsQaE3up',
  access_token_key: '1513330148-knu1IINVn88Rsdfdsfsdt6csfeGce9MbQu0dsfdsfu2iwi4Ivk3OG',
  access_token_secret: 'PTC9Qn27GdEq2GzrRPED0cpJjUjNG2KiVanqaIk0qvsdfsdf9ck',
app_only_auth:        true
});
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 

    T.get('search/tweets', { q: d.toString().trim(), count: 2 }, function(err, data, response) {
  var tweet = data.statuses;
  for(var i=0;i<tweet.length;i++){
   console.log(tweet[i].text);
  };
})
    console.log("you entered: [" + 
        d.toString().trim() + "]");
  });
// T.get('search/tweets', { q: 'messi', count: 2 }, function(err, data, response) {
//   var tweet = data.statuses;
//   for(var i=0;i<tweet.length;i++){
//    console.log(tweet[i].text);
//   };
// })

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
