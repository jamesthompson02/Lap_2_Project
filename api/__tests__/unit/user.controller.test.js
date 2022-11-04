const authController = require('../../controllers/auth')
const User = require('../../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('auth controller', () => {
    beforeEach(() =>  jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('register', () => {
        test('it creates a new user and returns a JWT token with a status of 201', async () => {
            let testUser = {
                name: "New User",
                email: "name@email.com",
                password: "Secret23!",
              }
              let token = "token"
            testUser.createJWT = jest.fn(() => token)
            jest.spyOn(User, 'create')
                 .mockResolvedValue(testUser);
                  const mockReq = { body: testUser }
                  await authController.register(mockReq, mockRes);
                  expect(mockStatus).toHaveBeenCalledWith(201);
                  expect(mockJson).toHaveBeenCalledWith({token});
        })
    }),
    describe('login', () => {
        test('it logins an existing user and returns a JWT token with a status of 200', async () => {
            let testUser = {
                email: "name@email.com",
                password: "Secret23!",
              }
              const salt = await bcrypt.genSalt(10);
              const testPassword = await bcrypt.hash(testUser.password, salt);
            let returnedUser = {
                email: "name@email.com",
                password: testPassword,
            }
              let token = "token"
              returnedUser.createJWT = jest.fn(() => token)
            returnedUser.comparePassword = User.prototype.comparePassword
            jest.spyOn(User, 'findOne')
                 .mockResolvedValue(returnedUser);
                  const mockReq = { body: testUser }
                  await authController.login(mockReq, mockRes);
                  expect(mockStatus).toHaveBeenCalledWith(200);
                  expect(mockJson).toHaveBeenCalledWith({token});
        })
    })
});
