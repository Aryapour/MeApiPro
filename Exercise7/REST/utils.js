import jwt from 'jsonwebtoken';
import { getUsers } from './database.js';

import * as settings from './config.json' with { type: "json" };
const limiterSettings = settings.default.rataeLimiterSettimgs


const getLimiterWindow =() => {
    const window = Math.round(
        Date.now() / limiterSettings.windowsSizeInMillis)
    return window    
}

// pridicate function: true if the number of requests have exceeded
// for this specific user within the limiting windows
const rateLimiter = (user, req, res) =>{
    const window = getLimiterWindow()
    // is this user moving to the next windows?
    if (user.rateLimiting.window < window){
        user.rateLimiting.window = window;
        user.rateLimiting.window = 1
        res.set('X-RateLimit-Remaining', limiterSettings.Limit-1)

    } else { // we are at the same window that we visited last time
        if ( user.rateLimiting.requestCounter >= limiterSettings.Limit){
            res.set('X-RateLimit-Remaining', 0)
            res.status(429).end()
            return true
        } else {
            user.rateLimiting.requestCounter++
            res.set('X-RateLimit-Remaining', limiterSettings.limit - user.rateLimiting.requestCounter)
        }
    }
 
    
    return false

}

const verifyToken = (req, res, next) => {
    const bearer_token = req.header('Authorization');
    if (bearer_token && bearer_token.toLowerCase().startsWith('bearer')) { // Check for valid Bearer token
        const token = bearer_token.substring(7);
        try {
            const decodeToken = jwt.verify(token, 'my_secret_key');
            const now = Date.now()/1000;
            //console.log(decodeToken); // for testing error in terminal
            const isValid = (decodeToken.exp-now) >= 0 ? true : false;
                if(isValid){
                    let user = getUsers().users.find(a => a.username === decodeToken.username && a.token === token) // Verify user and token
                    if (! rateLimiter(user, req, res)) { 
                     next();
                } else 
                res.status(401).json({ "error": "Unautorized" }); 
            } else 
            res.status(401).json({ "error": "Invalid token" });
        } catch (err) {
            res.status(401).json({ "error": "Invalid token" });
        }
    } else {
        res.status(401).json({ "error": "Invalid token---> Authorization header missing or invalid" }); // Handle missing/invalid header
    }
};

//  this is a idea for using unit test
const sum = (a,b) => {
    return a+b;
}

export {
    sum,
    verifyToken
};
