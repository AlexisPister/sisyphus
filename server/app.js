const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const LoginWithTwitter = require('login-with-twitter')
const Twit = require('twit')

const tw = new LoginWithTwitter({
    consumerKey: 'eDvbUiPf9EI97E2OMVFyrIjEJ',
    consumerSecret: 'L0Zuxn6kawe8Ofq9vB1IJRzfb4RG7EqtHGuH4tD0JK87tZRaXG',
    callbackUrl: 'http://localhost:8080/sign'
})

const app = express();

// configure the express-session middleware
app.use(session({
    secret: 'your secret here',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))
app.use(bodyParser.json());

// configure the Twitter client
// const client = new Twitter({
//   consumer_key: 'your consumer key here',
//   consumer_secret: 'your consumer secret here',
//   access_token_key: 'your access token key here',
//   access_token_secret: 'your access token secret here'
// })

// configure the OAuth client
// const oauth = new OAuth.OAuth(
//   'https://api.twitter.com/oauth/request_token',
//   'https://api.twitter.com/oauth/access_token',
//   'your consumer key here',
//   'your consumer secret here',
//   '1.0A',
//   'http://localhost:3000/callback',
//   'HMAC-SHA1'
// )

// handle requests to the homepage
app.get('/', (req, res) => {
    console.log("ok");
})

app.get("/sign", (req, res) => {
    console.log("session sign", req.session)
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if (err) {
            console.log(err)
        }

        // Delete the tokenSecret securely
        // delete req.session.tokenSecret

        // The user object contains 4 key/value pairs, which
        // you should store and use as you need, e.g. with your
        // own calls to Twitter's API, or a Twitter API module
        // like `twitter` or `twit`.
        // user = {
        //   userId,
        //   userName,
        //   userToken,
        //   userTokenSecret
        // }

        req.session.user = user;
        // req.session.accessToken = user.userToken;
        // req.session.accessSecret = user.userTokenSecret;

        // Redirect to whatever route that can handle your new Twitter login user details!
        // res.redirect('http://localhost:8080')

        res.redirect("/twitter/check-auth");
    })
})

// redirect the user to Twitter for authentication
app.get('/login', (req, res) => {
    console.log("session login", req.session)
    tw.login((err, tokenSecret, url) => {
        if (err) {
            // Handle the error your way
            console.log(err);
            res.send("ERROR")
        }

        // Save the OAuth token secret for use in your /twitter/callback route
        req.session.tokenSecret = tokenSecret
        // Redirect to the /twitter/callback route, with the OAuth responses as query params
        res.redirect(url)
    })
})


app.get('/twitter/check-auth', (req, res) => {
    // console.log("session check auth", req.session)
    if (req.session.user) {
        res.json({isAuth: true});
    } else {
        res.json({isAuth: false});
    }
});


app.post('/twitter/post-tweet', (req, res) => {
    let user = req.session.user;
    let tweetText = req.body.message;

    const T = new Twit({
        consumer_key: 'eDvbUiPf9EI97E2OMVFyrIjEJ',
        consumer_secret: 'L0Zuxn6kawe8Ofq9vB1IJRzfb4RG7EqtHGuH4tD0JK87tZRaXG',
        access_token: user.userToken,
        access_token_secret: user.userTokenSecret,
    })

    console.log("TEE ", user, tweetText);
    console.log("TEE2 ", T);
    T.post('statuses/update', {status: tweetText}, function (err, data, response) {
        console.log(data)
    })
});


app.listen("8080");
