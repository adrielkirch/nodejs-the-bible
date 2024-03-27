/**
 * **State**
 *
 * > "Allow an object to alter its behavior when its internal state changes.
 * The object will appear to change its class."
 *
 * In front-end applications and games it's super common to encounter state,
 * because these types of systems are heavily reliant on states of UIs, players,
 * inventories, and whatever knick-knacks you can think of.
 *
 * The State pattern, then, is a pattern meant to express the states of an object
 * and how the object can change its state based on those states. Consequently,
 * making state transitions explicit is an effect of using the pattern.
 *
 * While state can be shared, don't forget to think about who "owns" the transitions.
 * In our demo, this is clear, but your case may get more polluted.
 *
 * In closing, It's quite straightforward to implement, and it's useful in numerous cases.
 *
 * Below, let's check it out for a lighting system.
 *
 * @see https://refactoring.guru/design-patterns/state
 * @see https://en.wikipedia.org/wiki/State_pattern
 */
function stateDemo() {
  interface LightState {
    turnOn(context: LightBulb): void;
    turnOff(context: LightBulb): void;
  }

  // Concrete State classes
  class OnState implements LightState {
    turnOn() {
      console.log('The light is already on.');
    }

    turnOff(context: LightBulb) {
      console.log('Turning off the light.');
      context.setState(new OffState());
    }
  }

  class OffState implements LightState {
    turnOn(context: LightBulb) {
      console.log('Turning on the light.');
      context.setState(new OnState());
    }

    turnOff() {
      console.log('The light is already off.');
    }
  }

  // Context - what the user will interact with
  class LightBulb {
    private state: LightState = new OffState();

    setState(state: LightState) {
      this.state = state;
    }

    turnOn() {
      this.state.turnOn(this);
    }

    turnOff() {
      this.state.turnOff(this);
    }
  }

  // Toggles the modes a bit
  const bulb = new LightBulb();

  bulb.turnOn();
  bulb.turnOn();
  bulb.turnOff();
  bulb.turnOn();
  bulb.turnOff();
  bulb.turnOff();
}

stateDemo();
