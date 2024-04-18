//Usage: node get_item.js 1

const client = require('./client-grpc');

const request = {
    id: process.argv[2]
};

client.GetItem(request, (error, response) => {
    if (!error) {
        console.log('Received Note:', response);
    } else {
        console.error('Error getting note:', error);
    }
});
