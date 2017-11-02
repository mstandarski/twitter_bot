console.log("so far, so good...")

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var params = {
    q: 'chipotle', 
    count: 5
};

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
]

var randomIndex = Math.floor(Math.random()*jokesArray.length);

console.log(jokesArray[randomIndex]);


tweetIt();
setInterval(tweetIt, 1000*60*60*12);

function tweetIt() {
    var r = Math.floor(Math.random()*100);
    var tweet = {
        status: jokesArray[randomIndex]
    }

    T.post('statuses/update', tweet, createTweet);

    function createTweet(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log("You used the Twitter machine successfully!");
        }
    }
}


// uncomment below to search for tweets.  Adjust params variable 
// T.get('search/tweets', params, getTweets);

// function getTweets(err, data, response) {
//     var tweets = data.statuses;
//     console.log(tweets[2]);

//     for (var i = 0; i < tweets.length; i++) {
//         console.log(tweets[i].text);
//     }
// };