const client = require('./client-grpc');

//Usage: node delete_item.js 1

const request = {
    id: process.argv[2]
};

client.DeleteItem(request, (error, response) => {
    if (!error) {
        console.log('Deleted Note:', response);
    } else {
        console.error('Error getting note:', error);
    }
});
