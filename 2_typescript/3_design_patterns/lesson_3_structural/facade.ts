/**
 * **Facade**
 *
 * > "Provide a unified interface to a set of interfaces in a subsystem.
 * Facade defines a higher-level interface that makes the subsystem easier to use."
 *
 * The intent above should be fairly straightforward. Think of this as an
 * extension of the Adapter pattern.
 *
 * While it's a truism that all classes/functions/methods and their systems
 * should be well-written, expressive, and easy to use, it's often
 * a necessary (or structural) necessity to provide high-level constructs
 * for clients to use. The Facade makes that happen.
 *
 * While an Adapter facilitates interfacing between two incompatible
 * systems, the Facade also ensures that the consuming side gets
 * a simplified, upgraded way of interacting. A key difference is that
 * the Facade does not need to hold any references to the destination
 * (or its classes), it is only expected to relay the data there.
 *
 * For those of us working with web technologies and integrations, this
 * is one of my favorites and something you'll see often.
 *
 * Let's look at a house as an example. We don't care about the low-level
 * stuff like plumbing, just that we _have_ plumbing and that it works.
 *
 * @see https://refactoring.guru/design-patterns/facade
 * @see https://en.wikipedia.org/wiki/Facade_pattern
 * @see Page 185 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function facadeDemo() {
  class PlumbingSystem {
    pressure = 0;

    setPressure(pressure: number) {
      this.pressure = pressure;
      console.log(`Set the pressure to ${pressure}!`);
    }

    turnOn() {
      console.log('Turning on the plumbing!');
    }

    turnOff() {
      console.log('Turning off the plumbing...');
    }
  }

  class ElectricalSystem {
    voltage = 0;

    setVoltage(voltage: number) {
      this.voltage = voltage;
      console.log(`Set the voltage to ${voltage}!`);
    }

    turnOn() {
      console.log('Turning on the electricity!');
    }

    turnOff() {
      console.log('Turning off the electricity...');
    }
  }

  // Witness how we've simplified the low-level use by packaging it in expressive high-level features
  class House {
    private plumbing = new PlumbingSystem();
    private electrical = new ElectricalSystem();

    public turnOnSystems() {
      this.electrical.setVoltage(120);
      this.electrical.turnOn();
      this.plumbing.setPressure(500);
      this.plumbing.turnOn();
    }

    public shutDown() {
      this.plumbing.turnOff();
      this.electrical.turnOff();
    }
  }

  const house = new House();
  house.turnOnSystems();
  house.shutDown();
}

facadeDemo();
