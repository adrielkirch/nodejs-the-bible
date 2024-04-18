const client = require("./client-grpc");

//Usage: node set_item.js 1 title description

const request = { id: process.argv[2], title: process.argv[3], content: process.argv[4] };
client.SetItem(request, (error, response) => {
  if (!error) {
    console.log("Received Note:", response);
  } else {
    console.error("Error getting note:", error);
  }
});
