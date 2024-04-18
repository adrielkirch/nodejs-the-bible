const client = require('./client-grpc')

//Usage: node get_notes.js

client.list({}, (error, notes) => {
    if (!error) {
        console.log(notes)
    } else {
        console.error(error)
    }
})