const express = require ('express');
//it is going to look for the package in the node module folder

const app = new express ();
// express gives us a function, it is going to return us a instance of express
const Joi = require('joi');
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/pokedex', { useNewUrlParser: true });

const Pokemon = require('./models/Pokemon.js')

const port = process.env.PORT || 5000;
//for deployment - heroku may have a different environment variable other than 5000


// const pokemon = [
//   {
//     id: 1,
//     name: 'bulbasaur'
//   },
//   {
//     id: 2,
//     name: 'ivysaur'
//   },
//   {
//     id: 3,
//     name: 'venusaur'
//   },
//   {
//     id: 4,
//     name: 'charmander'
//   }
// ]

app.use(express.json()); // middleware - without this statement we have no access to request body

app.get('/', (req,res)=>{
  return res.send('hello world! from API')
})
//call back function, what people are going to do when people send a get request to the root path

app.get('/pokemon/', (req,res)=>{
  //select all the pokemon from model
  //send a response
  Pokemon.find({})
    .then(docs => res.send(docs));
});

app.get('/pokemon/:id/', (req,res)=>{
//:id = query parameters
// express allow us to grab the parameter
// req.params gives us access to the value /pokemon/:id parameters
//this key (id) give us access to the value 
// const id = req.params.id;
  const { id } = req.params;
//object destructuring, which object we want to pull out
  const poke = pokemon.find(p => p.id === parseInt(id));
  if(!poke){
    //200 success
    //300 redirect
    //400 user error
    //500 server error
    return res.status(404).send('Pokemon not found!');
  }
  return res.send(poke);
// find method : it takes a callback. passing in a function to do something over a 
// collection of item of once it is ready
});

app.post('/pokemon', (req,res)=>{
  //grab the values from the body
  const { id, name} = req.body
  //create new Pokemon Object
  const poke = { id, name };
  //validate we have ID and names
  const schema = {
    id: Joi.number().required(),
    name: Joi.string().min(3).required()
  }
  const valid = Joi.validate(poke, schema);
  console.log(valid)
  if (valid.error) {
    const message = valid.error.details[0].message
    return res.status(400).send(message);
  }
  //insert new Pokemon into an Array
  pokemon.push(poke);
  //send back Pokemon that has been added
  return res.send(poke);
})

//update pokemon data (don't forget to put (:id)so it know where to put)
app.put('/pokemon/:id', (req, res) => {
  //3. update the record, and send back
  //grab the values from the body
  const id = req.params.id;
  const name = req.body.name;
  //looking for the poke id that matches with the params id in the array
  const changeName = pokemon.find(poke => poke.id == id)
  //declaring a variable that allow us to look for the index of the object
  const position = pokemon.indexOf(changeName);
  //chaning the value of the object
  pokemon[position].name = name;
  console.log(req.body)
  res.send(pokemon[position].name = name)
})

app.delete('/pokemon/:id', (req, res) => {
  //if the poke does not exist
  if (!poke) {
    return res.status(404).send('Pokemon not found');
  }
  //look for the id
  const id = req.params.id;
  // grab the object from the array
  const object = pokemon.find(poke=> poke.id == id);
  //index of the object
  const objectIndex = pokemon.indexOf(object);
  //delete the object from the array
  pokemon.splice(objectIndex, 1)
  res.send("{it has been deleted successfully}")
})

app.listen(port, ()=>{
  console.log(`listening at http://localhost:${port}`)
})
//tell our app to run