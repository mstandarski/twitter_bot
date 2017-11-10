var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var rp = require('request-promise');

var apiKey = "";

var jokesArray = [
    "Breaking News: Bill Gates has agreed to pay for Trump's wall - On the condition he gets to install windows.",
    "Why is EA the worst gaming company in America? Because Ubisoft is in France.",
    "What do you call a book club that's been stuck on one book for years? Church",
    "Three conspiracy theorists walk into a bar - You can't tell me that's just a coincidence.",
    "Steve Jobs would've been a better president than Trump. But I guess comparing apples to oranges is unfair.",
    "Why will congress never impeach Trump? Republicans always insist on carrying a baby to full term.",
    "Why is Peter Pan always flying? He Neverlands.",
    "What’s the difference between a politician and a flying pig? The letter F.",
    "Jehovah's Witnesses don't celebrate Halloween. I guess they don't appreciate random people coming up to their door.",
    "The Only Thing Flat-Earthers Fear.....is sphere itself.",
    "If a tree falls in the forest and no one is around to hear it...then my illegal logging business is a success.",
    "What do you call an emo a capella group? Self Harmony",
    "How do you break up two blind guys fighting? Yell, 'My money's on the guy with the knife!'",
    "Have you guys ever heard of the crazy Mexican Train Killer? He had... Loco Motives",
    "why was Pavlov's hair so soft? Classical conditioning",
    "What's brown and rhymes with Snoop? Dr. Dre",
    "Did you hear Donald Trump wants to ban the sale of pre-shredded cheese? He's going to make America grate again.",
    "I named my eraser Confidence. Because it gets smaller after every mistake I make.",
    "I've been diagnosed with a chronic fear of giants…Feefiphobia…",
    "Why did the sitcom about airplanes never take off? Because the pilot was terrible.",
    "How many tickles does it take to make an octopus laugh? Ten tickles",
    "If I bought a balloon for $0.99...How much should I sell it for when I adjust for inflation?"
];

var newsSource = [
   "abc-news-au",
   "al-jazeera-english",
   "ars-technica",
   "associated-press",
   "bbc-news",
   "bbc-sport",
   "bloomberg",
   "breitbart-news",
   "business-insider",
   "business-insider-uk",
   "buzzfeed",
   "cnbc",
   "cnn",
   "daily-mail",
   "engadget",
   "entertainment-weekly",
   "espn",
   "espn-cric-info",
   "financial-times",
   "focus",
   "football-italia",
   "fortune",
   "four-four-two",
   "fox-sports",
   "google-news",
   "hacker-news",
   "ign",
   "independent",
   "mashable",
   "metro",
   "mirror",
   "mtv-news",
   "mtv-news-uk",
   "national-geographic",
   "new-scientist",
   "newsweek",
   "new-york-magazine",
   "nfl-news",
   "polygon",
   "recode",
   "reddit-r-all",
   "reuters",
   "spiegel-online",
   "talksport",
   "techcrunch",
   "techradar",
   "the-economist",
   "the-guardian-au",
   "the-guardian-uk",
   "the-hindu",
   "the-huffington-post",
   "the-lad-bible",
   "the-new-york-times",
   "the-next-web",
   "the-sport-bible",
   "the-telegraph",
   "the-times-of-india",
   "the-verge",
   "the-wall-street-journal",
   "the-washington-post",
   "time",
   "usa-today"
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
   {find: new RegExp('\\b(first|second|third)-degree\\b', 'gi'), replace: 'friggin awful'},
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
   {find: new RegExp('\\bwin votes\\b', 'gi'), replace: 'find Pokemon'},
   {find: new RegExp('\\bbehind the headlines\\b', 'gi'), replace: 'beyond the grave'},
   {find: new RegExp('\\be[- ]?mail\\b', 'gi'), replace: 'poem'},
   {find: new RegExp('\\bfacebook post\\b', 'gi'), replace: 'poem'},
   {find: new RegExp('\\bfacebook ceo\\b', 'gi'), replace: 'this guy'},
   {find: new RegExp('\\blatest\\b', 'gi'), replace: 'final'},
   {find: new RegExp('\\bdisrupt\\b', 'gi'), replace: 'destroy'},
   {find: new RegExp('\\bmeeting\\b', 'gi'), replace: 'ménage à trois'},
   {find: new RegExp('\\bscientists\\b', 'gi'), replace: 'Channing Tatum and his friends'},
   {find: new RegExp('\\byou won\'t believe\\b', 'gi'), replace: 'I\'m really sad about'},
   {find: new RegExp('\\btea\\b', 'gi'), replace: 'leaf water'},
   {find: new RegExp('\\btweets\\b', 'gi'), replace: 'cries for help'}
];

var randomNewsIndex = Math.floor(Math.random()*newsSource.length);

var options = {
   uri: 'https://newsapi.org/v1/articles?source=' + newsSource[randomNewsIndex] + '&apiKey='+ apiKey,
   json: true // Automatically parses the JSON string in the response
};

var headline;
var alteredHeadlines;
var tweetsArray = [];
var randomIndex = Math.floor(Math.random()*tweetsArray.length);

function fakeNews() {
    rp(options).then(function (data) {
        console.log("**********" + data.source + "*********** line 201");
        for (var i = 0; i < data.articles.length; i++) {
            for (var h = 0; h < words.length; h++) {
                headline = data.articles[i].title;
                alteredHeadlines = headline.replace(words[h].find, words[h].replace);

                if (headline != alteredHeadlines) {
                    tweetsArray.push(alteredHeadlines);
                }
            }
        }
        for (var t = 0; t < tweetsArray.length; t++) {
            console.log(tweetsArray[randomIndex] + " line 213");
            
            return tweetsArray[randomIndex];
        }
    })
    .catch(function (err) {
        console.log(err); // API call failed...
    });
}

setInterval(makeATweet, 1000*5);

function tweetIt() {
    var tweet = {
        status: tweetsArray[randomIndex] + " #AlteredHeadline"
    };
    
    T.post('statuses/update', tweet, createTweet);

    function createTweet(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log("You used the Twitter machine successfully!");
        }
    }
}

function makeATweet() {
    fakeNews();
    setTimeout(function() {
        tweetIt();
        console.log(tweetsArray[randomIndex] + " <--- line 244");
        
    }, 1000)
}

makeATweet();