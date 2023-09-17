require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

let Person = mongoose.model("Person", PersonSchema);

const createAndSavePerson = done => {
  const person = new Person({
    name: "Mario",
    age: 48,
    favoriteFoods: ["pizza"],
  });

  person.save((err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

const arrayOfPeople = [
  { name: "Mario", age: 48, favoriteFoods: ["Pizza"] },
  { name: "Mariarosa", age: 46, favoriteFoods: ["Pizza"] },
  { name: "Roberto", age: 74, favoriteFoods: ["Pizza"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err);
    }

    // add "hamburger" to favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // callback - save() the updated Person.
    person.save((err, data) => {
      if (err) {
        return done(er);
      }
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) {
        return done(err);
      }
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const removeManyPeople = done => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = done => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
