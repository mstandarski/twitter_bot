var rp = require('request-promise');
 
var apiKey = "";
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

var mapObj = {
    chainsaw:"butta noife",
    wife:"gold fish",
    witnesses:"these dudes I know",
    allegedly:"totally",
    rebuild:"avenge",
    space:"spaaaace",
    smartphone:"pokedex",
    electric:"atomic",
    senator:"elf-lord",
    //the below also impacts words like "carries".  Fix this bug.
    car:"cat",
    election:"eating contest",
    debate:"dance-off",
    //figure out how to get the expected results regardless of case.
    poll:"psychic reading",
    Poll:"Psychic reading",
    candidate:"bigfoot hunter",
    drone:"dog",
    successfully:"suddenly",
    expands:"physically expands",
    global:"spherical",
    years:"minutes",
    minutes:"years",
    horsepower:"tons of horsemeat",
    gaffe:"magic spell",
    ancient:"haunted",
    surprising:"surprising (but not to me)",
    tension:"ominous tension",
    email:"poem",
    Trump:"Pat Sayjak",
    latest:"final",
    scientists:"Channing Tatum and his friends",
    prison:"dungeon",
    judge:"judgemental person",
    vegetarian:"loud mouth",
    passengers:"stuffed animals",
    marathon:"Conga line",
    detective:"guy wearing a cape",
    cold:"ice cold",
    iphone:"walkman",
    riot:"yoga meetup",
    government:"overlords",
    angry:"miffed",
    dog:"Snoop Dog",
    force:"horse",
    jailed:"thown in the dungeon"
};

var randomIndex = Math.floor(Math.random()*newsSource.length);

var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

var options = {
    uri: 'https://newsapi.org/v1/articles?source=' + newsSource[randomIndex] + '&apiKey='+ apiKey,
    json: true // Automatically parses the JSON string in the response
};

var headlines;
var alteredHeadlines;
 
function fakeNews() {
    rp(options)
        .then(function (data) {        
            console.log("**********" + data.source + "***********")
            
            for (var i = 0; i < data.articles.length; i++) {
                headlines = data.articles[i].title;

                // console.log(headlines.replace(re, function(matched){
                //     return mapObj[matched];
                // }) + "  <-- fake news");

                alteredHeadlines = headlines.replace(re, function(matched){return mapObj[matched]});
                // console.log(alteredHeadlines)
                return alteredHeadlines;

                // console.log(alteredHeadlines)
            }
            return;        
        })
        .catch(function (err) {
            // API call failed...
        });
}

fakeNews();