/*********************************************************************************
Web322 Assignment 4
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source
(including web sites) or distributed to other students

Jason Kwan      Student ID: 142633163   Date Sunday, 10/1/2017

heroku URL: https://web322assignments.herokuapp.com/employees
********************************************************************************/
const express = require("express");
const path = require("path");
const ds = require("./data-service.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set("view engine", ".hbs");
var HTTP_PORT = process.env.PORT || 8080;

ds.initialize().then(function () {
    app.listen(HTTP_PORT, function () {
        console.log("App listening on: " + HTTP_PORT);
    })
}).catch(function (err) {
    res.send(err);
});


app.get("/", function (req, res) {
    res.render("home");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/employees/add", (req, res) => {
    res.render("addEmployee");
});
app.post("/employees/add", (req, res) => {
    console.log(req.body);
    ds.addEmployee(req.body).then(function () {
        res.redirect("/employees");
    });
});

app.get("/employee/:empNum", (req, res) => { //:variable
    ds.getEmployeesByNum(req.params.empNum).then((msg) => {
        //console.log(msg);
        //res.json(msg);
        res.render("employee", {data: msg, title:"Employee"});
    }).catch(function (err) {
        res.status(404).send("Page not found");
    });
});
app.post("/employee/update", (req, res) => {
    //console.log(req.body);
    ds.updateEmployee(req.body).then(function(msg){
        res.redirect("/employees");
    });
   
});
   

app.get("/employees", (req, res) => {
    if (req.query.status) {
        ds.getEmployeesByStatus(req.query.status).then(function (ebsarr) {
            res.render("employeeList", { data: ebsarr, title: "Employees" });
        }).catch(function (err) {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.manager) {
        ds.getEmployeesByManager(req.query.manager).then(function (ebmarr) {
            res.render("employeeList", { data: ebmarr, title: "Employees" });
        }).catch(function (err) {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.department) {
        ds.getEmployeesByDepartment(req.query.department).then((ebdarr) => {
            res.render("employeeList", { data: ebdarr, title: "Employees" });
        }).catch(function (err) {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else {
        ds.getAllEmployees().then((alarr) => {
            res.render("employeeList", { data: alarr, title: "Employees" });
        }).catch(function (err) {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    }
});




app.get("/managers", (req, res) => {
    ds.getManagers().then((manArr) => {
        res.render("employeeList", { data: manArr, title: "Employees (Managers)" });
    }).catch(function (err) {
        res.render("employeeList", { data: {}, title: "Departments" });
    });;
});

app.get("/departments", (req, res) => {
    ds.getDepartments().then((depArr) => {
        res.render("departmentList", { data: depArr, title: "Departments" });
    }).catch(function (err) {
        res.render("departmentList", { data: {}, title: "Departments" });
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found").end();
});

