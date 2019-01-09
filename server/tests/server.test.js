const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

 //#region Seed data
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});
//#endregion Seed data

describe('POST /todos', () => { //#region 
  it('should create a new todo', (done) => {
    let text = 'Test todo-text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    let text = '';
    
    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  })
}); //#endregion

describe('GET /todos', () => { //#region 
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
}); //#endregion
 
describe('GET /todos/:id', () => { //#region 
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
    });
}); //#endregion

describe('DELETE /todos/:id', () => { //#region 
  it('should remove a todo', (done) => {
    let hexid = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexid}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexid);
      })
      .end((err, res) => {
        if (err){
          return done(err);
        }
        
        Todo.findById(hexid).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    const id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);

  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
}); //#endregion

describe('PATCH /todos/:id', () => { //#region 
  it('should update the todo', (done) => {
    let hexid = todos[0]._id.toHexString();
    let text = 'This is an updated text';

    request(app)
      .patch(`/todos/${hexid}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let hexid = todos[1]._id.toHexString();
    let text = 'This is an updated text';

    request(app)
      .patch(`/todos/${hexid}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
        
      })
      .end(done);
  });
}); //#endregion