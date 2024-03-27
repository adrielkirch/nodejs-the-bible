/**
 * **Mediator**
 *
 * > "Define an object that encapsulates how a set of objects interact.
 * Mediator promotes loose coupling by keeping objects from referring to each other
 * explicitly, and it lets you vary their interaction independently."
 *
 * In short, the Mediator pattern centralizes communication between objects.
 * It makes it fairly easy to wire up many behaviors into one object. While not
 * the most sophisticated approach, I think this is useful for a lot of cases.
 *
 * For it to work, we distinguish between the Mediator (which "owns" and
 * brokers the communication) and the colleagues (which "use" the Mediator).
 *
 * While not following the pattern, I've often used (and seen) this type of
 * pattern used with direct references to (for example in games) Manager classes
 * rather than having them injected at (here: User) creation time. It does
 * look better when done as shown here, though!
 *
 * In our demo, we'll check a chat room with users. We'll defer to the chat room,
 * acting as a mediator, to actually send messages.
 *
 * @see https://refactoring.guru/design-patterns/mediator
 * @see https://en.wikipedia.org/wiki/Mediator_pattern
 * @see Page 273 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function mediatorDemo() {
  interface ChatMediator {
    addUser(user: User): void;
    sendMessage(message: string, user: User): void;
  }

  class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User) {
      this.users.push(user);
    }

    sendMessage(message: string, sender: User) {
      this.users.forEach((user) => {
        if (user !== sender) user.receive(message);
      });
    }
  }

  // The User is a type of "colleague class"
  class User {
    constructor(private name: string, private mediator: ChatMediator) {
      //
    }

    send(message: string) {
      this.mediator.sendMessage(message, this);
    }

    receive(message: string) {
      console.log(`${this.name} received: ${message}`);
    }
  }

  // Time for some old-school chatting
  const chatRoom: ChatMediator = new ChatRoom();

  const user1: User = new User('John', chatRoom);
  const user2: User = new User('Alice', chatRoom);
  const user3: User = new User('Bob', chatRoom);

  chatRoom.addUser(user1);
  chatRoom.addUser(user2);
  chatRoom.addUser(user3);

  user1.send('Hi, everyone!');
  console.log('---');
  user2.send('Hello, John!');
}

mediatorDemo();
