const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.u3a5hv7.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:String,
  number:String
})
const Person = mongoose.model('Person',personSchema)

if(process.argv.length === 5){
  const person = new Person({
    name:process.argv[3],
    number:process.argv[4]
  })
  person.save().then(() => {
    console.log('Person saved')
    mongoose.connection.close()
  })
}else{
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}