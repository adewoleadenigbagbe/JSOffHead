const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoconnect = require('./dbconnect');

var Product = require('./models/product');

const server = require('./app');
const should = chai.should();
chai.use(chaiHttp);

describe("run test on product module",function(){
    before("test",function(done){
        let conn = mongoconnect();
        conn
        .then(result => {
             console.log("Sucessfully connected to the database " +result)
             let port = process.env.Port || 6007
             server.listen(port,() => {
                 console.log(`jsoff-head running on port ${port}`);
                 done();
             })
        })
        .catch(err => 
         {
             console.log("Failed connecting to the database" + err)
             done(err);
         });
        
    })
    describe('Perform CRUD on product', function(){
        it("clear the product documents",function(done){
            Product.deleteMany({},(err)=> {
                if(err){
                    console.log(err)
                    done(err);
                }
                done();
            });         
        })
        it("product #1 to the db",function(done){
            let product = new Product({
                productName : "pampers",
                unitPrice : 50,
                unitInStock : 32,
                discontinued : false,
                categoryInfo : "5d8399d9597feb0b482db66f"     
            });
            chai.request(server)
            .post('/api/product')
            .send(product)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('responseCode','00');
                res.body.should.have.property('message','Product saved sucessfully');
                res.should.not.have.a.status(200);
                done();
            })
        })
        it("product #2 to the db",function(done){
            let product = new Product({
                productName : "Baby cardigan",
                unitPrice : 20,
                unitInStock : 32,
                discontinued : false,
                categoryInfo : "5d8399d9597feb0b482db66f"     
            });
            chai.request(server)
            .post('/api/product')
            .send(product)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('responseCode','00');
                res.body.should.have.property('message','Product saved sucessfully');
                res.should.not.have.a.status(200);
                done();
            })
        })
        it("get all products",function(done){
            chai.request(server)
            .get('/api/product')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('responseCode','00');
                res.body.should.have.property('products').be.an('array');
                done();
            })
        })
    })
    after("Done",function(done){
        console.log("Api test done and dusted ...")
        done();
    })
})