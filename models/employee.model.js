const mongoose =require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required: 'This field is required!'
    },
    lastname: {
        type:String,
        required: 'This field is required!'
    },
    email: {
        type:String,
    },
    mobile: {
        type:String,
        required: 'This field is required!'
    },
    address: {
        type:String,
        required: 'This field is required!'
    }
});

//Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid Email format!');


mongoose.model('employees', employeeSchema);