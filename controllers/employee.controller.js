const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('employees');


//Add Record Route
router.get('/', (req, res) => {
    res.render("employee/operations", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

function insertRecord(req,res){
    var employee = new Employee();
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.address = req.body.address;
    employee.save((err, doc) => {
        if(!err)
            res.redirect('employee/list');
        else {
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/operations", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }                
            else 
                console.log('Error on saving record : ' + err);
                       
        }        
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.render("employee/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving employee records! ' + err);
        }
    });
});

function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'firstname':
                body['firstNameError'] = err.errors[field].message;
                break;
            case 'lastname':
                    body['lastNameError'] = err.errors[field].message;
                    break;
            case 'email':
                    body['emailError'] = err.errors[field].message;
                    break;
            case 'mobile':
                    body['mobileError'] = err.errors[field].message;
                    break;
            case 'address':
                    body['addressError'] = err.errors[field].message;
                    break;
            default:
                break;
        }
    }
}


//Edit Record Route
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err){
            res.render("employee/operations", {
                viewTitle:"Update Employee",
                employee: doc
            });
        }
    });
});

function updateRecord(req, res){
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true}, (err, doc) => {
        if(!err) { 
            res.redirect('employee/list'); 
        } else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/operations", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update! ' + err);
        }
    });
}

//Delete Record Route
router.get('/delete/:id', (req, res) =>{
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('/employee/list');
        }else{
            console.log('Error in deleting record! ' + err);
        }
    });
})

module.exports = router;