// LATEST PUSH 06/08/2024
// EVENT STUFF DISABLED 
// DATA.DB SET FROM 14/07/24 05:31AM UK TIME
//
const tmi = require('tmi.js');
const reputation = {};
const r = /\d+/;
const rNew = '(\d+)[^\d]+Bits';
const rNewBlerp = '(\d+)[^\d]+bits';
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
//
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//
let db = new sqlite3.Database('data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to DB!');
});
function updateDB(user, bits, subs, datetime) { //user, bits, subs, datetime

//db.run('INSERT INTO dono_record(user, bits, subs, datetime) VALUES(?, ?, ? , ?)', [user, bits, subs, datetime], (err) => {
	//if(err) {
		//return console.log(err.message); 
	//}
	//console.log('Row was added to the table: ${this.lastID}');
//})
}
//
const {
    Client,
    GatewayIntentBits
} = require('discord.js')
const dClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // ...
    ]
})
dClient.on("ready", () => {
    console.log("I am ready!");
    //dClient.channels.cache.get('1254602731717398648').send('[MODE] Filtering Chat..');
});

dClient.on("messageCreate", (message) => {
    if (message.content.startsWith("ping")) {
        message.channel.send("pong!");
    } else {
        console.log("No perms");
    }
});
dClient.login("discord_bot_token");
//
var total = 4297; //
var bitCount = 0;
var wheelDiscount = 0;
var wheelPrice = 4000;
var lastDono = "";
var date = new Date();
//

fs.readFile('/var/tbot/bits.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  bitCount = parseInt(data);
});
//
const client = new tmi.Client({
    options: {
        debug: true
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: 'twitch_name',
        password: 'oauth:twitch_auth_token'
    },
    channels: ['Phatcrumpet']
});

client.connect();

// Detects CheerX for Points-A-Thon and calculates points/sends updated total
client.on("cheer", (channel, userstate, message) => {
    total = Math.round(Number(message.match(r)) / 100 * 2 + total);
    //client.say(channel, `Someone Cheered ${message.match(r)} bits! This has added ${message.match(r) / 100 * 2} points! The new total is: ${total}`);
    bitCount = bitCount + parseInt(userstate.bits); //
    dClient.channels.cache.get(`1254602731717398648`).send("**[BITS] " + userstate.username + " Cheered " + userstate.bits + " bits! **");
    dClient.channels.cache.get('1254602731717398648').send("**[BIT UPDATE]**:" + bitCount);
    lastDono = userstate.username;
    //updateDB(userstate.username, userstate.bits, 0, date.toISOString());

});
//
lastGifter = "";
subCounter = 0;
client.on("subgift", (channel, username, streakMonths, recipient, methods, tags) => {
    //total = total + 4;
    //client.say(channel, `${username} Gifted a sub to ${recipient}! Points Total: ${total}`);
    //let senderCount = ~~userstate["msg-param-sender-count"];
    lastGifter = username;
    if (username == lastGifter) {
    subCounter = subCounter + 1;
    
    } else {
    dClient.channels.cache.get(`1254602731717398648`).send("**[GIFT SUB]" + username + "** Gifted A Subscription!** Total " + subCounter);
    }
    
    //updateDB(username, 0, 1, date.toISOString());

});

client.on("subscription", function(channel, username, methods) {
    if (methods.plan == 3000) { // Tier 3
    dClient.channels.cache.get(`1254602731717398648`).send("**[TIER 3 SUB] " + username + "** Subscribed!");
    dClient.channels.cache.get('1123899910425690172').send("**[TIER 3 SUB] " + username + "** Subscribed!");

    } else { // Ignore T2 for standard subs:
    dClient.channels.cache.get(`1254602731717398648`).send("**[SUB] " + username + "** Subscribed!");
    }
    //updateDB(username, 0, 1, date.toISOString());
});

client.on("resub", function(channel, username, months, message, userstate, methods) {
    if (methods.plan == 3000) {
    dClient.channels.cache.get(`1254602731717398648`).send("**[TIER 3 RESUB] " + username + "** Subscribed!");
    dClient.channels.cache.get('1123899910425690172').send("**[TIER 3 RESUB] " + username + "** Subscribed!");

    } else {
    dClient.channels.cache.get(`1254602731717398648`).send("**[RESUB] " + username + "** Subscribed!");
    }
    //updateDB(username, 0, 1, date.toISOString());
});

//
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate["msg-param-sender-count"];
dClient.channels.cache.get(`1254602731717398648`).send("**[SUB GIFT] " + username + "** Gifted " + numbOfSubs + " Subs!**");
//updateDB(username, 0, numbOfSubs, date.toISOString());
});

//
function isNumber(value) {
  return typeof value === 'number';
}
client.on('message', (channel, user, msg) => {
    //console.log(user + ": " + msg);
// Save the bits after every cycle:
fs.writeFile('/var/tbot/bits.txt', bitCount + "", err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});

    if (user.username == "blerp") { // -----
        const splitArg = msg.split(" ");
        if ((splitArg[1]) == "is") {
            // do nothing
        } else {

            dClient.channels.cache.get('1254602731717398648').send("**[BLERP]" + capitalizeFirstLetter(user.username) + "**: " + msg);
            //bitCount = bitCount + parseInt(msg.match(r));
             //var theseBits = msg.match(rNewBlerp) + '';
             const splitArg = msg.split(" ");
             bitCount = bitCount + parseInt(splitArg[2]);
             console.log(parseInt(splitArg[2]));
            dClient.channels.cache.get('1254602731717398648').send("**[BIT UPDATE]**:" + bitCount);
            lastDono = splitArg[0];
            //updateDB(splitArg[0], parseInt(splitArg[2]), 0, date.toISOString());
        }

    } else if (user.username == "soundalerts") {
        dClient.channels.cache.get('1254602731717398648').send("**[SOUNDALERTS]" + capitalizeFirstLetter(user.username) + "**: " + msg);
        //theseBits = msg.match('\d+(?:/\d+)?(?=\s?Bits?\b)');
        const splitArg = msg.split(" ");
         for (let i = 0; i < splitArg.length; i++) {
              if (splitArg[i] == "Bits") {
                theseBits = parseInt(splitArg[i-1]);
                console.log(splitArg[i] + " " + splitArg[i-1]);
                //updateDB(splitArg[0], parseInt(splitArg[i-1]), 0, date.toISOString());
             }

           }
        
        lastDono = splitArg[0];
        bitCount = bitCount + parseInt(theseBits); 
        console.log("TEST " + bitCount);
        dClient.channels.cache.get('1254602731717398648').send("**[BIT UPDATE]**:" + bitCount);

        console.log(bitCount);
        dClient.channels.cache.get('1254602731717398648').send("**[BIT UPDATE]**:" + bitCount);
    } else if (user.username == "timeoutwithbits") {
        const splitArg = msg.split(" ");
        dClient.channels.cache.get('1254602731717398648').send("**[TIMEOUTWITHBITS]" + capitalizeFirstLetter(user.username) + "**: " + msg);
        bitCount = bitCount + parseInt(splitArg[12]);
        //updateDB(splitArg[0], parseInt(splitArg[12]), 0, date.toISOString());
        console.log(bitCount);
        dClient.channels.cache.get('1254602731717398648').send("**[BIT UPDATE]**:" + bitCount);
        lastDono = splitArg[0];
    } else {

           //message sending with badges:
           amendedMsg  = "**" + capitalizeFirstLetter(user.username) + ":** " + msg;
           if (user.username == "phatcrumpet") { amendedMsg = "<:Broadcaster:1257851427787898900>" + amendedMsg;   }
           if (user.subscriber) { amendedMsg = "<:T1:1257846634650538046>" + amendedMsg;  } 
           if (user.mod) { amendedMsg = "<:Mod:1257846633454895144>" + amendedMsg; } 
           if ((user.vip != null) && user.vip) { amendedMsg = "<:VIP:1257846632326631475>" + amendedMsg; }
           // END OF BADGES
           if (msg.startsWith("http")) { 
            
            dClient.channels.cache.get('1254737792970522667').send("Link posted: <" +msg+ "> by " + user.username);
           } else {
            dClient.channels.cache.get('1254737792970522667').send(amendedMsg);
           
            }
            //if (msg.startsWith("â €â €â €â €â €â €â €â €â €â €â €â €â €â €â €â  ")) { console.log("ping") }

          
        if (user.mod) {
            //dClient.channels.cache.get('1254737792970522667').send("<:Mod:1257846633454895144>**" + capitalizeFirstLetter(user.username) + ":** " + msg);

            if (msg.startsWith("!setbits")) {

                const splitArg = msg.split(" ");
                bitCount = parseInt(splitArg[1]);
                console.log(bitCount);
                dClient.channels.cache.get('1254602731717398648').send("**[MANUAL UPDATE] @" + capitalizeFirstLetter(user.username) + "**: " + msg);

            } else if (msg.startsWith("!getbits")) {

                dClient.channels.cache.get('1254602731717398648').send("**[MANUAL REQUEST] @" + capitalizeFirstLetter(user.username) + " Bits**: " + bitCount);
                client.say("phatcrumpet","@PhatCrumpet  " +  bitCount);
            } else if (msg.startsWith("!wheelrate")) {

                const splitArg = msg.split(" ");
                if (parseInt(splitArg[1]) == 50) {
                    wheelPrice = 2000;

                } else if (parseInt(splitArg[1]) == 25) {
                    wheelPrice = 3000;

                } else if (parseInt(splitArg[1]) == 100) {

                    wheelPrice = 4000;
                }
                dClient.channels.cache.get('1254602731717398648').send("**[MANUAL UPDATE] @" + capitalizeFirstLetter(user.username) + "**: Set wheel price to " + wheelPrice);
            } else if (msg.startsWith("!log")) {
                var newMsg = msg.replace(/!log/g,'');
                dClient.channels.cache.get('1123899910425690172').send("**" + newMsg + "**");
           } else if (msg.startsWith("!addbits")) {
             const splitArg = msg.split(" ");
             bitCount = bitCount + parseInt(splitArg[1]);
             dClient.channels.cache.get('1254602731717398648').send("**[MANUAL UPDATE] @" + capitalizeFirstLetter(user.username) + "**: Added " + parseInt(splitArg[1]) + " to the total bits!");

           }

        } else {
            //dClient.channels.cache.get('1254737792970522667').send("**[USER]" + capitalizeFirstLetter(user.username) + ":** " + msg);
        }
        if (bitCount >= wheelPrice) {
            dClient.channels.cache.get('1254602731717398648').send("**[WHEEL DETECTED] @" + capitalizeFirstLetter(lastDono) + "**: Has " + Math.floor(bitCount / wheelPrice) + " wheel(s) with " + bitCount + " bits!").then(function(message) {

            }).catch(function() {
                //Something
            });
            wheelCount = Math.floor(bitCount / wheelPrice);
            for (let i = 0; i < wheelCount; i++) {
                bitCount = bitCount - wheelPrice;

            }
            dClient.channels.cache.get('1254602731717398648').send("**[WHEEL DETECTED] New Bit count: **" + bitCount);
        }
    }
});
