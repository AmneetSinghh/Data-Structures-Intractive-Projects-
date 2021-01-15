const mongoose = require('mongoose');

/// create two schemes, means tables;

const PlayerScheme = new mongoose.Schema({

    currentWordIndex: { type: Number, default: 0 },
    socketID: { type: String },
    isPartyLeader: { type: Boolean, default: false }, // the starting player, who will share the links;
    WPM: { type: Number, default: -1 },
    nickName: { type: String }



    // every socket has a unique identifier, that why, every scoket has a unique id;
});

const GameSchema = new mongoose.Schema({

    words: [{ type: String }],
    isOpen: { type: Boolean, default: true }, //anyone can join if they have the id of joining;
    isOver: { type: Boolean, default: false },
    players: [PlayerScheme], // we just pass the full player
    startTime: { type: Number }





    // every socket has a unique identifier, that why, every scoket has a unique id;
});


module.exports = mongoose.model('Game', GameSchema);