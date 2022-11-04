const mockingoose = require("mockingoose");

const HabitModel = require("../../models/habit");

const authentication = require('../../middleware/authentication');

const { auth } = jest.fn();

describe("test mongoose Habit model", () => {
  it("should return a habit", () => {
    const _doc = {
      _id: "507f191e810c19729de860ea",
      name: "name",
      habits: "name@email.com",
      //   createdBy: req.user.userId,
    };

    mockingoose(HabitModel).toReturn(_doc, "findOne");

    return HabitModel.findOne({ _id: "507f191e810c19729de860ea" }).then(
      (doc) => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      }
    );
  });

  it("should  create a habit", () => {
    
    const payload = {
      userId: "507f191e810c19729de860ea",
      name: "name",
      email: "name@email.com"
    
    };



    const _doc = {
      _id: "507f191e810c19729de860ea",
      name: "James",
      habits: {
        water: {current: 1000,
                required: 2000}
      },
      createdBy: payload.userId,
    };

    mockingoose(HabitModel).toReturn(_doc, "save");

    return HabitModel.create( {_doc} ).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  it("should  update a habit", () => {
    const _doc = {
      _id: "507f191e810c19729de860ea",
      name: "name",
      habits: "name@email.com",
    };

    mockingoose(HabitModel).toReturn(_doc, "findOneAndUpdate");

    return HabitModel.findOneAndUpdate({ _doc }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});
