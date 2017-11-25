const Twit = require('twit');
const rp = require('request-promise');
const config = require('./config');

let gHeadlines = []; // global array for passing headlines around. I use g for global. I use UPPERCASE for fixed constants like let PORT = 80 and _prop for 'hidden' object props just how I do it.
let gDisableRealTweeting = false; // global flag to turn off tweeting (mainly for debugging)

const gReplacements = [  // I removed the regular expressions tokens. They are put back later, but this is way easier to understand and edit
    {find: 'nasa', replace: 'nazgul'},
    {find: 'harvard', replace: 'Hogwarts'},
    {find: 'eating', replace: 'farting'},
    {find: 'secret', replace: 'not-so-secret'},
    {find: 'politician', replace: 'lizard person'},
    {find: 'politicians', replace: 'lizard people'},
    {find: 'millenial', replace: 'snake person'},
    {find: 'millenials', replace: 'snake people'},
    {find: 'putin', replace: 'putin (peace be upon him)'},
    {find: 'investors', replace: 'alchemists'},
    {find: 'sources', replace: 'the intern'},
    {find: 'cloud', replace: 'butt'},
    {find: 'economy', replace: 'angry giant'},
    {find: 'user', replace: 'victim'},
    {find: 'russian', replace: 'person with tall, fuzzy hat'},
    {find: 'russians', replace: 'bears on unicycles'},
    {find: 'ghost', replace: 'Pillsbury dough boy'},
    {find: 'atheist', replace: 'jelly donut'},
    {find: 'jailed', replace: 'thrown in dungeon'},
    {find: 'dog', replace: 'Snoop Dogg'},
    {find: 'angry', replace: 'miffed'},
    {find: 'government', replace: 'Illuminati'},
    {find: 'riot', replace: 'hot yoga session'},
    {find: 'idetective', replace: 'man wearing a cape'},
    {find: 'marathon', replace: 'Conga line'},
    {find: 'passengers', replace: 'stuffed animals'},
    {find: 'vegetarian', replace: 'uppity'},
    {find: 'judge', replace: 'Judge Judy'},
    {find: 'prison', replace: 'dungeon'},
    {find: 'Donald Trump', replace: 'someone with tiny hands'},
    {find: 'Trump', replace: 'a man with tiny hands'},
    {find: 'witnesses', replace: 'these dudes I know'},
    {find: 'allegedly', replace: 'kinda probably'},
    {find: 'new study', replace: 'tumblr post'},
    {find: 'rebuild', replace: 'avenge'},
    {find: 'space', replace: 'spaaace'},
    {find: 'google glass', replace: 'virtual boy'},
    {find: 'smartphone', replace: 'Pokédex'},
    {find: 'electric', replace: 'atomic'},
    {find: 'senator', replace: 'elf-lord'},
    {find: 'election', replace: 'eating contest'},
    {find: 'congressional leaders', replace: 'river spirits'},
    {find: 'homeland security', replace: 'homestar runner'},
    {find: 'could not be reached for comment', replace: 'is guilty and everyone knows it'},
    {find: 'debate', replace: 'dance-off'},
    {find: 'self driving', replace: 'uncontrollably swerving'},
    {find: 'poll', replace: 'psychic reading'},
    {find: 'candidate', replace: 'airbender'},
    {find: 'drone', replace: 'dog'},
    {find: 'vows to', replace: 'probably won\'t'},
    {find: 'at large', replace: 'very large'},
    {find: 'successfully', replace: 'suddenly'},
    {find: 'expands', replace: 'physically expands'},
    {find: '(first|second|third)-degree', replace: 'friggin awful'},
    {find: 'an unknown number', replace: 'like hundreds'},
    {find: 'front runner', replace: 'blade runner'},
    {find: 'global', replace: 'spherical'},
    {find: 'years', replace: 'minutes'},
    {find: 'no indication', replace: 'lots of signs'},
    {find: 'urged restraint by', replace: 'drunkenly egged on'},
    {find: 'horsepower', replace: 'tons of horsemeat'},
    {find: 'gaffe', replace: 'magic spell'},
    {find: 'ancient', replace: 'haunted'},
    {find: 'star[- ]studded', replace: 'blood soaked'},
    {find: 'remains to be seen', replace: 'will never be known'},
    {find: 'silver bullet', replace: 'way to kill warewolves'},
    {find: 'subway system', replace: 'tunnels I found'},
    {find: 'surprising', replace: 'surprising (but not to me)'},
    {find: 'wars of words', replace: 'interplanetary war'},
    {find: 'tension', replace: 'sexual tension'},
    {find: 'cautiously optimistic', replace: 'delusional'},
    {find: 'doctor who', replace: 'The Big Bang Theory'},
    {find: 'win votes', replace: 'find Pokemon'},
    {find: 'behind the headlines', replace: 'beyond the grave'},
    {find: 'e[- ]?mail', replace: 'poem'},
    {find: 'facebook post', replace: 'poem'},
    {find: 'facebook ceo', replace: 'this guy'},
    {find: 'latest', replace: 'final'},
    {find: 'disrupt', replace: 'destroy'},
    {find: 'meeting', replace: 'ménage à trois'},
    {find: 'scientists', replace: 'Channing Tatum and his friends'},
    {find: 'you won\'t believe', replace: 'I\'m really sad about'},
    {find: 'tea', replace: 'leaf water'},
    {find: 'tweets', replace: 'cries for help'},
    {find: 'oust', replace: 'cannibalize'},
    {find: 'car', replace: 'Razor scooter'}
    
    
];

const botBoopStatusUpdater = function (twitterConfig) {
    return function (tweatText) {
        let tweet = {
            status: tweatText
        };

        console.log(`[${tweet.status}] <-- getting ready to tweet this, line 102`);

        if (!gDisableRealTweeting) { // I did test this so it does work. You may have noticed a test tweet in your feed
            twitterConfig.post(
                'statuses/update', // ideally this should be passed in so you can make this as generic as possible
                tweet,
                (err, data, response) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("You used the Twitter machine successfully!");
                    }
                });
        }
    };
}(new Twit(config)); // so this takes a Twit config and returns a function which takes text and tweets it. This allows you to have multiple accounts if you want

const replaceWords = function (text, replacements) {       // does one thing and one thing only - replaces words. This is an expression not a statement. There are slight differences
    console.log(`Original text: [${text}] line 120`); // notice the ES6 template strings using ` !!!
    replacements.forEach(replacement => { // nice simple construction for this kind of thing
        let regEx = new RegExp("\\b" + replacement.find + "\\b", 'gi');   // yes this is inefficient but it is easier to edit the replacement word array. You can always optimize later
        text = text.replace(regEx, replacement.replace);
    });
    console.log(`New text: [${text}]` + "line 125");
    return text;
}

const randInt = function (max) {
    return Math.floor(Math.random() * max)
};

function updateHeadlines(newsSource) { // there are so many ways to do this... getHeadlines could itself return a promise. The easiest is just a global variables
    // Notice I don't call it getHeadlines anymore, because it really isn't returning anything, so I use the more accurate UPDATE
    const apiKey = "e60ab0b434994aeea38afbd90f90a947";
    const options = {
        uri: `https://newsapi.org/v1/articles?source=${newsSource}&apiKey=${apiKey}`,
        json: true // Automatically parses the JSON string in the response
    };

    console.log(`Retrieve headlines from ${options.uri} line 141`);
    rp(options).then(data => {
        console.log(`${data.articles.length} articles received from ${options.uri} line 144`);

        let titles = data.articles.map(a => {
            return {
                headline: a.title, 
                url: a.url
            };
         });
         //by organizing the info in an object that holds both the headline and url, I can later target JUST the headline to be changed when we get into makeTweet()
        
        gHeadlines.push(titles[randInt(titles.length)]);
        console.log(gHeadlines)

    }).catch(err => console.log(err));

    console.log("Exiting getHeadlines() line 152");
}

function updateRandomHeadlines() {
    const newsSource = [
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
    updateHeadlines(newsSource[randInt(newsSource.length)]); // randomly select a news source and update the headlines
}

const makeTweet = function () {
    // If no headlines, don't do anything
    if (gHeadlines.length === 0) return;
    let articleData = gHeadlines.pop(); // since they were randomized BEFORE adding you can just pop the headline!
    
    let futureTweet = {
        headline: replaceWords(articleData.headline, gReplacements), 
        url: articleData.url
    };
        
    if (futureTweet.headline === articleData.headline) {
        console.log("No words to change...restarting process...");
        return;
    };

    futureTweet = futureTweet.headline + " " + futureTweet.url; 
    botBoopStatusUpdater(futureTweet);
};



setInterval(makeTweet, 1000 * 60 * 5); // not sure why the original had a setTimeout. Seemed like interval was all I needed.

// Now there is one thing left and that is when to run updateHeadlines. You can do it at least 2 ways
// 1) inside makeTweet, just call updateRandomHeadlines
// 2) use another setInterval
// The hard part is getting headlines is async so you can't be sure when or if it will come back
// So you can just wait or you can wrap the callbacks or return a promise, bascially you have to decide as the designer of the system
// What I choose was simply to wait
setInterval(updateRandomHeadlines, 1000 * 60); // get new headlines every x amount of seconds
