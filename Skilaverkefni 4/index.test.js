//Importing the application to test
let server = require('../index');

//These are the actual modules we use
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let apiUrl = "http://localhost:3000";

describe('Endpoint tests', () => {
    //###########################
    //The beforeEach function makes sure that before each test, 
    //there are exactly two boards and one task (for the first board).
    //###########################
    beforeEach((done) => {
        server.resetState();
        done();
    });

    //###########################
    //Write your tests below here
    //###########################

    // This test doesn't do much
    it("Please remove me before handin - I don't do much", function (done) {
        chai.request(apiUrl)
            .get('/')
            .end((err, res) => {
                res.should.not.be.undefined;
                done();
            });
    });
});

it("GET events success case", function (done) {
    chai.request(apiUrl)
        .get('/api/v1/events')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
});

// board tests

it("GET boards/:boardId success case", function (done) {
    chai.request(apiUrl)
        .get('/api/v1/boards/' + boardId)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id').eql(boardId.toString());
            res.body.should.have.property('description').eql("");
            res.body.should.have.property('name').eql("Test Task");
            res.body.should.have.property('tasks');
            res.body.bookings.should.be.a('array');
            res.body.bookings.length.should.be.eql(1); // ?
            res.body.bookings.should.eql([taskId.toString()]); 
            Object.keys(res.body).length.should.be.eql(8); // ?
            done();
        });
});

it("POST boards success case", function (done) {
    let newBoard = {name: "Test Board 2"};

    chai.request(apiUrl)
        .post('/api/v1/boards/')
        .set('content-type', 'application/json') // ?
        .send(newBoard)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('description').eql("");
            res.body.should.have.property('name').eql("Test Board 2");
            res.body.should.have.property('tasks');
            res.body.bookings.should.be.a('array');
            res.body.bookings.length.should.be.eql(0); // ?
            res.body.bookings.should.eql([]); // ?
            Object.keys(res.body).length.should.be.eql(8); // ?
            done();
        });
});

it("GET /boards/:boardId/tasks success case", function (done) {
    chai.request(apiUrl)
        .get('/api/v1/boards/' + boardId + '/tasks')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.should.be.json;
            res.body.length.should.be.eql(1); // ? 
            done();
        });
});

// task test
it("GET /boards/:boardId/tasks/:taskId success case", function (done) {
    chai.request(apiUrl)
        .get('/api/v1/boards/' + boardId + '/tasks/' + taskId)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.should.be.json;
            res.body.should.have.property('_id').eql(bookingId.toString());
            res.body.should.have.property('taskName').eql("In Process");
            res.body.should.have.property('dateCreated').eql(Date.now);
            res.body.should.have.property('archived').eql(false);
            Object.keys(res.body).length.should.be.eql(6); // ?
            done();
        });
});

it("POST /boards/:boardId/tasks success case", function (done) {
    let newBooking = { boardId: boardId, taskName: "In process", dateCreated: Date.now, archived: false };

    chai.request(apiUrl)
        .post('/api/v1/boards/' + boardId + '/tasks')
        .set('content-type', 'application/json') //?
        .send(newTask)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.be.json;
            res.body.should.have.property('_id');
            res.body.should.have.property('taskName').eql("In Process");
            res.body.should.have.property('dateCreated').eql(Date.now);
            res.body.should.have.property('archived').eql(false);
            Object.keys(res.body).length.should.be.eql(6);
            done();
        });
});
