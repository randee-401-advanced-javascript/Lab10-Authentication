// need to test 
//post / signup
//post /signup
// get / users 

const serverApp = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

//create our mock server from the imported server 
const mockRequest = supergoose(serverApp.server);

//database is set up? not needed

describe('happy path', () => {
  it('can create a user ', async () => {
    //post to signup
    //sed username, password, (fname, lname)
    let response = await mockRequest.post('/signup').send({
      username: 'rUser',
      password: 'rPass',
      fname: 'Rill',
      lname: 'Riggs'
    });

    //check the response 
    // it should have the right status (201)
    //it should have a new record create in the response.body
    // this new record should have an _id
    //this new record should have a password created that doesn't match rpass
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.password).toBeDefined();
    expect(response.body.password).not.toBe('rPass');

  })
})


