const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name_arg = process.argv[3]
const number_arg = process.argv[4]

const url =
    `mongodb+srv://ollifullstack:${password}@cluster0-0nhdr.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (name_arg === undefined) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name_arg,
    number: number_arg
  })

  person.save().then( () => {
    console.log(`Added ${name_arg} ${number_arg} to phonebook`)
    mongoose.connection.close()
  })
}