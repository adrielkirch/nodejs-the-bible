/**
 * **Observer**
 *
 * > "Define a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified and updated automatically."
 *
 * One of the most popular patterns in JavaScript is the Observer pattern.
 * This pattern works well when you have a lot of objects that are dependent on each other,
 * and especially if you don't know before-hand how many dependents there are.
 *
 * Fun fact: It's also called "publish-subscribe", just like the architecture pattern!
 *
 * As the namesake suggests, an "observer" keeps tabs on "observables" - the things
 * you connect to, as it were. When something happens, the observer receives
 * notifications from observables/subjects and can respond to them.
 *
 * In the news example below, one can subscribe to a news agency. When there
 * are news to be published, it will be received by all subscribers. This ends
 * up calling a public method on the recipients, which you could wire up to do
 * any changes needed (act on data; update state...). In this case, we'll simply
 * log out that the user received the news.
 *
 * @see https://refactoring.guru/design-patterns/observer
 * @see https://en.wikipedia.org/wiki/Observer_pattern
 * @see Page 293 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function observerDemo() {
  // Observer interface
  interface NewsSubscriber {
    update(news: string): void;
  }

  // Observer
  class Subscriber implements NewsSubscriber {
    private name: string;

    constructor(name: string) {
      this.name = name;
    }

    update(news: string) {
      console.log(`${this.name} received news: ${news}`);
    }
  }

  // Observable, or Subject
  class NewsAgency {
    private subscribers: NewsSubscriber[] = [];

    subscribe(subscriber: NewsSubscriber) {
      this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber: NewsSubscriber) {
      this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }

    publish(news: string) {
      this.subscribers.forEach((subscriber) => subscriber.update(news));
    }
  }

  // Demo
  const newsAgency: NewsAgency = new NewsAgency();

  const subscriber1: NewsSubscriber = new Subscriber('Zephyr');
  const subscriber2: NewsSubscriber = new Subscriber('Seraphina');
  const subscriber3: NewsSubscriber = new Subscriber('Orion');

  newsAgency.subscribe(subscriber1);
  newsAgency.subscribe(subscriber2);
  newsAgency.publish(
    'Breaking News: Samyang Hot Chicken Ramen 4x Spicy released!'
  );
  console.log('---');

  newsAgency.subscribe(subscriber3);
  newsAgency.publish('Latest Update: Rainy as hell again in Gothenburg!');
  console.log('---');

  newsAgency.unsubscribe(subscriber1);
  newsAgency.publish('Entertainment News: Barbie breaks the movie box office!');
  console.log('---');
}

observerDemo();
