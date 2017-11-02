var rp = require('request-promise');
 
var apiKey = "removed";
var newsSource = [
    "abc-news-au",
    "bbc-news",
    "breitbart-news",
    "cnbc",
    "daily-mail",
    "entertainment-weekly",
    "usa-today",
    "the-washington-post",
    "new-york-magazine",
    "al-jazeera-english",
    "associated-press",
    "bloomberg",
    "business-insider",
    "buzzfeed",
    "cnn",
    "newsweek",
    "reuters",
    "the-economist",
    "the-huffington-post",
    "the-new-york-times",
    "the-wall-street-journal",
    "time"
];
var randomIndex = Math.floor(Math.random()*newsSource.length);

var options = {
    uri: 'https://newsapi.org/v1/articles?source=' + "usa-today"/*newsSource[randomIndex]*/ + '&apiKey='+ apiKey,
    json: true // Automatically parses the JSON string in the response
};

var headlines;
 
rp(options)
    .then(function (data) {        
        console.log("**********" + data.source + "***********")
        
        for (var i = 0; i < data.articles.length; i++) {
            headlines = data.articles[i].title;            
            // headlines.replace("chainsaw", "butta noife");
            console.log(headlines.replace("chainsaw", "butta noife").replace("wife", "gold fish"));
        }
        return;        
        // console.log(data.articles[1].title);
    })
    .catch(function (err) {
        // API call failed...
    });