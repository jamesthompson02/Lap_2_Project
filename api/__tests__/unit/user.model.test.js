const mockingoose = require("mockingoose");

const UserModel = require("../../models/user");

describe("test mongoose User model", () => {
  it("should return the created user", async () => {
    const _doc = {
      _id: "507f191e810c19729de860ea",
      name: "name",
      email: "name@email.com",
      password: "secret23",
    };
    return (UserModel.create({email: "name@email.com"})).catch((err) => {
      expect(err.message).toBe('User validation failed: password: Please provide a password, name: Please provide a name');
    });
  });

  it("should return the logged in user", () => {
    const _doc = {
      _id: "507f191e810c19729de860ea",
      name: "name",
      email: "name@email.com",
    };

    mockingoose(UserModel).toReturn(_doc, "findOne");

    return (
      UserModel.findOne({ email: "name@email.com" }) // this won't really change anything
        //   .where({ _id: "507f191e810c19729de860ea" })
        .then((doc) => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        })
    );
  });
});
