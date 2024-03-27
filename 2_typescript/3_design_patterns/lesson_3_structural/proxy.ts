/**
 * **Proxy**
 *
 * > "Provide a surrogate or placeholder for another object to control access to it."
 *
 * This behavior can be approximated with, but should not be confused with, the JavaScript Proxy object.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 *
 * A proxy is essentially a stand-in or placeholder for something.
 * The proxy pattern is useful when we, rather than manipulate the right thing,
 * can manipulate the proxy.
 *
 * In Design Patterns, the example is given of a resource-intensive image that is
 * only loaded when needed, though we still require using it to know its size etc.
 * We will use the same kind of example here.
 *
 * @see https://refactoring.guru/design-patterns/proxy
 * @see https://en.wikipedia.org/wiki/Proxy_pattern
 * @see Page 207 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function proxyDemo() {
  interface Image {
    display(): void;
  }

  class RealImage implements Image {
    private filename: string;

    constructor(filename: string) {
      this.filename = filename;
      this.loadFromDisk();
    }

    private loadFromDisk() {
      console.log(`Loading image: ${this.filename}`);
    }

    display() {
      console.log(`Displaying image: ${this.filename}`);
    }
  }

  class ProxyImage implements Image {
    private realImage: RealImage | null = null;
    private filename: string;

    constructor(filename: string) {
      this.filename = filename;
    }

    display() {
      if (!this.realImage) this.realImage = new RealImage(this.filename);
      this.realImage.display();
    }
  }

  // While we can't show the image, we can still act as if we have it available
  const image: Image = new ProxyImage('nature.jpg');

  // And when it's time to display it, we can simply do it
  image.display();
}

proxyDemo();
