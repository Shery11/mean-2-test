const mongoose = require('mongoose');

//Schema Object
const user = require()


//MongoDB url 
mongoose.connect('mongodb://localhost/dms', function (err) {
    if (err) {
        console.log('Not connected to the database : ' + err);
    }
    else {
        console.log('Connected successfully to mongoDB');
    }
});