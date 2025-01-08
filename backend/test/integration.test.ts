import { TaskService } from '../src/services/task.service';
import { UserService } from '../src/services/user.service';
import sinon from 'sinon';
import { expect } from 'chai';
import  { describe, beforeEach, afterEach, it } from 'node:test';



describe('Task Management API with Sinon', () => {
  let taskServiceInstance: TaskService;
  let userServiceInstance: UserService;

  let createTaskStub: sinon.SinonStub;
  let updateTaskStub: sinon.SinonStub;
  let registerUserStub: sinon.SinonStub;

  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: '11111',
  };

  const mockTask = {
    id: 1,
    description: 'Test Task',
    priority: 'High',
    status: 'Pending',
    date: new Date(),
    assigneeId: mockUser.id,
  };

  beforeEach(() => {
    taskServiceInstance = new TaskService();
    userServiceInstance = new UserService();

    registerUserStub = sinon.stub(userServiceInstance, 'register').resolves({
      user: mockUser,
      token: 'fake-jwt-token',
    });

    createTaskStub = sinon.stub(taskServiceInstance, 'createTask').resolves(mockTask);

    updateTaskStub = sinon.stub(taskServiceInstance, 'updateTask').resolves({
      id: 1,
      description: 'Updated Task',
      priority: 'Medium',
      status: 'In Progress',
      date: new Date(),
      assigneeId: 1,
    });


    
  });


  it('should register a user and create a task associated with the user', async () => {
    const { user, token } = await userServiceInstance.register(
      mockUser.name, 
      mockUser.email, 
      mockUser.password
    );

    expect(user.id).to.equal(mockUser.id);
    expect(user.name).to.equal(mockUser.name);
    expect(token).to.equal('fake-jwt-token');
    
    const createdTask = await taskServiceInstance.createTask({
      description: 'Test Task',
      priority: 'High',
      status: 'Pending',
      date: "2025-01-08T15:49:34.017Z",
      assigneeId: user.id,
    });

    expect(createdTask.id).to.equal(mockTask.id);
    expect(createdTask.assigneeId).to.equal(user.id);
    expect(createdTask.description).to.equal('Test Task');
  });
 });
