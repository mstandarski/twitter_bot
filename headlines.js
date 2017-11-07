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

var words = [
    {find: new RegExp('\\bnasa\\b', 'gi'), replace: 'nazgul'},
    {find: new RegExp('\\bharvard\\b', 'gi'), replace: 'Hogwarts'},
    {find: new RegExp('\\beating\\b', 'gi'), replace: 'farting'},
    {find: new RegExp('\\bvideo\\b', 'gi'), replace: 'moving picture'},
    {find: new RegExp('\\bsecret\\b', 'gi'), replace: 'not-so-secret'},
    {find: new RegExp('\\bpolitician\\b', 'gi'), replace: 'lizard person'},
    {find: new RegExp('\\bpoliticians\\b', 'gi'), replace: 'lizard people'},
    {find: new RegExp('\\bmillenial\\b', 'gi'), replace: 'snake person'},
    {find: new RegExp('\\bmillenials\\b', 'gi'), replace: 'snake people'},
    {find: new RegExp('\\bputin\\b', 'gi'), replace: 'putin (peace be upon him)'},
    {find: new RegExp('\\binvestors\\b', 'gi'), replace: 'alchemists'},
    {find: new RegExp('\\bsources\\b', 'gi'), replace: 'the intern'},
    {find: new RegExp('\\bcloud\\b', 'gi'), replace: 'butt'},
    {find: new RegExp('\\beconomy\\b', 'gi'), replace: 'angry giant'},
    {find: new RegExp('\\buser\\b', 'gi'), replace: 'victim'},
    {find: new RegExp('\\brussian\\b', 'gi'), replace: 'person with tall, fuzzy hat'},
    {find: new RegExp('\\brussians\\b', 'gi'), replace: 'bears on unicycles'},
    {find: new RegExp('\\bghost\\b', 'gi'), replace: 'Pillsbury dough boy'},
    {find: new RegExp('\\batheist\\b', 'gi'), replace: 'jelly donut'},
    {find: new RegExp('\\bjailed\\b', 'gi'), replace: 'thrown in dungeon'},
    {find: new RegExp('\\bdog\\b', 'gi'), replace: 'Snoop Dogg'},
    {find: new RegExp('\\bangry\\b', 'gi'), replace: 'miffed'},
    {find: new RegExp('\\bgovernment\\b', 'gi'), replace: 'Illuminati'},
    {find: new RegExp('\\briot\\b', 'gi'), replace: 'hot yoga session'},
    {find: new RegExp('\\bidetective\\b', 'gi'), replace: 'man wearing a cape'},
    {find: new RegExp('\\bmarathon\\b', 'gi'), replace: 'Conga line'},
    {find: new RegExp('\\bpassengers\\b', 'gi'), replace: 'stuffed animals'},
    {find: new RegExp('\\bvegetarian\\b', 'gi'), replace: 'loud mouth'},
    {find: new RegExp('\\bjudge\\b', 'gi'), replace: 'Judge Judy'},
    {find: new RegExp('\\bprison\\b', 'gi'), replace: 'dungeon'},
    {find: new RegExp('\\bDonald Trump\\b', 'gi'), replace: 'someone with tiny hands'},
    {find: new RegExp('\\bwitnesses\\b', 'gi'), replace: 'these dudes I know'},
    {find: new RegExp('\\ballegedly\\b', 'gi'), replace: 'kinda probably'},
    {find: new RegExp('\\bnew study\\b', 'gi'), replace: 'tumblr post'},
    {find: new RegExp('\\brebuild\\b', 'gi'), replace: 'avenge'},
    {find: new RegExp('\\bspace\\b', 'gi'), replace: 'spaaace'},
    {find: new RegExp('\\bgoogle glass\\b', 'gi'), replace: 'virtual boy'},
    {find: new RegExp('\\bsmartphone\\b', 'gi'), replace: 'Pokédex'},
    {find: new RegExp('\\belectric\\b', 'gi'), replace: 'atomic'},
    {find: new RegExp('\\bsenator\\b', 'gi'), replace: 'elf-lord'},
    {find: new RegExp('\\belection\\b', 'gi'), replace: 'eating contest'},
    {find: new RegExp('\\bcongressional leaders\\b', 'gi'), replace: 'river spirits'},
    {find: new RegExp('\\bhomeland security\\b', 'gi'), replace: 'homestar runner'},
    {find: new RegExp('\\bcould not be reached for comment\\b', 'gi'), replace: 'is guilty and everyone knows it'},
    {find: new RegExp('\\bdebate\\b', 'gi'), replace: 'dance-off'},
    {find: new RegExp('\\bself driving\\b', 'gi'), replace: 'uncontrollably swerving'},
    {find: new RegExp('\\bpoll\\b', 'gi'), replace: 'psychic reading'},
    {find: new RegExp('\\bcandidate\\b', 'gi'), replace: 'airbender'},
    {find: new RegExp('\\bdrone\\b', 'gi'), replace: 'dog'},
    {find: new RegExp('\\bvows to\\b', 'gi'), replace: 'probably won\'t'},
    {find: new RegExp('\\bat large\\b', 'gi'), replace: 'very large'},
    {find: new RegExp('\\bsuccessfully\\b', 'gi'), replace: 'suddenly'},
    {find: new RegExp('\\bexpands\\b', 'gi'), replace: 'physically expands'},
    {find: new RegExp('\\b(first|second|third)-degree\\b', 'gi'), replace: 'friggin\' awful'},
    {find: new RegExp('\\ban unknown number\\b', 'gi'), replace: 'like hundreds'},
    {find: new RegExp('\\bfront runner\\b', 'gi'), replace: 'blade runner'},
    {find: new RegExp('\\bglobal\\b', 'gi'), replace: 'spherical'},
    {find: new RegExp('\\byears\\b', 'gi'), replace: 'minutes'},
    {find: new RegExp('\\bno indication\\b', 'gi'), replace: 'lots of signs'},
    {find: new RegExp('\\burged restraint by\\b', 'gi'), replace: 'drunkenly egged on'},
    {find: new RegExp('\\bhorsepower\\b', 'gi'), replace: 'tons of horsemeat'},
    {find: new RegExp('\\bgaffe\\b', 'gi'), replace: 'magic spell'},
    {find: new RegExp('\\bancient\\b', 'gi'), replace: 'haunted'},
    {find: new RegExp('\\bstar[- ]studded\\b', 'gi'), replace: 'blood soaked'},
    {find: new RegExp('\\bremains to be seen\\b', 'gi'), replace: 'will never be known'},
    {find: new RegExp('\\bsilver bullet\\b', 'gi'), replace: 'way to kill warewolves'},
    {find: new RegExp('\\bsubway system\\b', 'gi'), replace: 'tunnels I found'},
    {find: new RegExp('\\bsurprising\\b', 'gi'), replace: 'surprising (but not to me)'},
    {find: new RegExp('\\bwars of words\\b', 'gi'), replace: 'interplanetary war'},
    {find: new RegExp('\\btension\\b', 'gi'), replace: 'sexual tension'},
    {find: new RegExp('\\bcautiously optimistic\\b', 'gi'), replace: 'delusional'},
    {find: new RegExp('\\bdoctor who\\b', 'gi'), replace: 'The Big Bang Theory'},
    {find: new RegExp('\\bwin votes\\b', 'gi'), replace: 'find Poke\&#769;mon'},
    {find: new RegExp('\\bbehind the headlines\\b', 'gi'), replace: 'beyond the grave'},
    {find: new RegExp('\\be[- ]?mail\\b', 'gi'), replace: 'poem'},
    {find: new RegExp('\\bfacebook post\\b', 'gi'), replace: 'poem'},
    {find: new RegExp('\\bfacebook ceo\\b', 'gi'), replace: 'this guy'},
    {find: new RegExp('\\blatest\\b', 'gi'), replace: 'final'},
    {find: new RegExp('\\bdisrupt\\b', 'gi'), replace: 'destroy'},
    {find: new RegExp('\\bmeeting\\b', 'gi'), replace: 'me\&#769;nage a\&#768; trois'},
    {find: new RegExp('\\bscientists\\b', 'gi'), replace: 'Channing Tatum and his friends'},
    {find: new RegExp('\\byou won\'t believe\\b', 'gi'), replace: 'I\'m really sad about'},
    {find: new RegExp('\\bcourt\\b', 'gi'), replace: 'pizza'},
    {find: new RegExp('\\btea\\b', 'gi'), replace: 'leaf water'},
    {find: new RegExp('\\btweets\\b', 'gi'), replace: 'cries for help'}
];

var randomIndex = Math.floor(Math.random()*newsSource.length);

var options = {
    uri: 'https://newsapi.org/v1/articles?source=' + newsSource[randomIndex] + '&apiKey='+ apiKey,
    json: true // Automatically parses the JSON string in the response
};

var headlines;
var alteredHeadlines;
var tweetsArray = [];
 
function fakeNews() {
    rp(options).then(function (data) {
        console.log("**********" + data.source + "***********");
        for (var i = 0; i < data.articles.length; i++) {
            console.log(headlines + " <---prestine headline");

            for (var h = 0; h < words.length; h++) {
                headlines = data.articles[i].title;
                alteredHeadlines = headlines.replace(words[h].find, words[h].replace);

                if (headlines != alteredHeadlines) {
                    tweetsArray.push(alteredHeadlines);
                }
            }
        }
        for (var t = 0; t < tweetsArray.length; t++) {
            console.log(tweetsArray[t] + "<---fake news");
        }
    })
    .catch(function (err) {
        console.log(err); // API call failed...
    });
};

fakeNews();