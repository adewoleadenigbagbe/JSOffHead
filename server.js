var app = require('./app');
var mongoconnect = require('./dbconnect');
let conn = mongoconnect();

conn.then(result => {
        console.log("Sucessfully connected to the database " +result)
        let port = process.env.Port || 6007
        app.listen(port,() => {
            console.log(`jsoff-head running on port ${port}`);
        })
    })
    .catch(err => 
    {
        console.log("Failed connecting to the database" + err)
    });
        