const mongoose =require('mongoose');

//mongoDB connection in localhost
mongoose.connect('mongodb://localhost:27017/mernCrud', {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if(!err) {
        console.log('MongoDB Connected!')
    } else {
        console.log('MongoDB Connection Error: ' + err )
    }
});

require('./employee.model');