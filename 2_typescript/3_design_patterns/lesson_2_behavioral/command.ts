/**
 * **Command**
 *
 * > "Encapsulate a request as an object, thereby letting you parameterize
 * clients with different requests, queue or log requests, and support undoable operations."
 *
 * This is a very popular pattern in microservices, and from what I gather, in game engines.
 *
 * You can store/keep, queue, and otherwise operate on commands.
 * While it's possible to simplify the pattern to directly executing
 * commands, it's a feature of the pattern to keep tabs on what commands
 * are being passed into classes.
 *
 * @see https://refactoring.guru/design-patterns/command
 * @see https://en.wikipedia.org/wiki/Command_pattern
 * @see Page 233 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function commandDemo() {
  interface Command {
    execute(): void;
  }

  class Light {
    turnOn() {
      console.log('Light is ON');
    }

    turnOff() {
      console.log('Light is OFF');
    }
  }

  class LightOnCommand implements Command {
    constructor(private light: Light) {
      //
    }

    execute() {
      this.light.turnOn();
    }
  }

  class LightOffCommand implements Command {
    constructor(private light: Light) {
      //
    }

    execute() {
      this.light.turnOff();
    }
  }

  class RemoteControl {
    private commands: Command[] = [];

    public setCommand(command: Command) {
      this.commands.push(command);
    }

    public pressButton() {
      for (const command of this.commands) command.execute();
      this.clear(); // In our implementation, we'll clear the command list on button presses
    }

    private clear() {
      this.commands = [];
    }
  }

  const light: Light = new Light();
  const remote: RemoteControl = new RemoteControl();

  const lightOnCommand: Command = new LightOnCommand(light);
  const lightOffCommand: Command = new LightOffCommand(light);

  console.log('Command demo: Light on');

  remote.setCommand(lightOnCommand);
  remote.pressButton();

  console.log('Command demo: Light off');

  remote.setCommand(lightOffCommand);
  remote.pressButton();

  console.log('Command demo: Stacked commands');

  remote.setCommand(lightOnCommand);
  remote.setCommand(lightOffCommand);
  remote.setCommand(lightOnCommand);
  remote.setCommand(lightOnCommand);
  remote.setCommand(lightOffCommand);
  remote.pressButton();
}

commandDemo();
