/**
 * **Bridge**
 *
 * > "Decouple an abstraction from its implementation so that the two can vary independently."
 *
 * The Bridge decouples implementation and abstractions.
 * If this smells of general polymorphism it's because it's not
 * too far off!
 *
 * In our example, we'll create a high-level abstraction (the `ElectronicDevice`)
 * which any number of classes can implement. This way, they can evolve
 * to their own needs, but still be based on shared interfaces.
 *
 * You know that you have a Bridge when you can independently evolve lower-level
 * classes based off of the bridging interface.
 *
 * @see https://refactoring.guru/design-patterns/bridge
 * @see https://en.wikipedia.org/wiki/Bridge_pattern
 */
function bridgeDemo() {
  interface ElectronicDevice {
    turnOn(): string;
    turnOff(): string;
  }

  class TV implements ElectronicDevice {
    turnOn() {
      return 'TV is turned on!';
    }

    turnOff() {
      return 'TV is turned off!';
    }
  }

  class VoiceAssistant implements ElectronicDevice {
    turnOn() {
      return 'Voice assistant is turned on!';
    }

    turnOff() {
      return 'Voice assistant is turned off!';
    }
  }

  interface RemoteControl {
    powerOn(): string;
    powerOff(): string;
  }

  class DeviceRemoveControl implements RemoteControl {
    constructor(private device: ElectronicDevice) {
      //
    }

    powerOn() {
      return this.device.turnOn();
    }

    powerOff() {
      return this.device.turnOff();
    }
  }

  // Usage
  const tv: ElectronicDevice = new TV();
  const assistant: ElectronicDevice = new VoiceAssistant();

  const tvRemote: RemoteControl = new DeviceRemoveControl(tv);
  const assistantRemote: RemoteControl = new DeviceRemoveControl(assistant);

  console.log(tvRemote.powerOn());
  console.log(assistantRemote.powerOff());
}

bridgeDemo();
