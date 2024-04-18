const grpc = require("grpc");
const notesProto = grpc.load("notes.proto");

const notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" },
];

const server = new grpc.Server();

// Add service methods to the server
server.addService(notesProto.NoteService.service, {
  List: (_, callback) => {
    callback(null, { notes: notes });
  },

  GetItem: (call, callback) => {
    const id = call.request.id;
    const foundNote = notes.find((note) => note.id === id);
    if (!foundNote) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Note not found",
      });
      return;
    }
    callback(null, foundNote);
  },
  SetItem: (call, callback) => {
    const newNote = call.request;

    // Check if the note with the provided id exists
    const existingNoteIndex = notes.findIndex(
      (note) => note.getId() === newNote.getId()
    );

    if (existingNoteIndex !== -1) {
      // If the note exists, update it
      notes[existingNoteIndex] = newNote;
      callback(null, newNote);
    } else {
      // If the note doesn't exist, push the new note
      notes.push(newNote);
      callback(null, newNote);
    }
  },
  DeleteItem: (call, callback) => {
    const id = call.request.id;
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Note not found",
      });
      return;
    }
    const deletedNote = notes.splice(index, 1)[0];
    callback(null, deletedNote);
  },
});

// Start the server
server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();
