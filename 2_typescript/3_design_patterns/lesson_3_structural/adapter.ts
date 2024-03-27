/**
 * **Adapter**
 *
 * > "Convert the interface of a class into another interface clients expect.
 * Adapter lets classes work together that couldn't otherwise because of
 * incompatible interfaces."
 *
 * When you need to hook up incompatible objects you might want to
 * consider the Adapter pattern. It provides the possibility to adapt
 * the interface of one thing into another.
 *
 * A good analogy is two people speaking with each other, but none of them
 * knowing the language of the other. How to solve this situation? By
 * using an adapter of course!
 *
 * The adapter typically extends or implements one of the parties, in order
 * to stay true to the destination's interface and contract.
 *
 * You'll typically witness this pattern in integration contexts, as it's
 * common to use something like this to make sure both origin and recipient can
 * stay "unpolluted" in their data, contracts, and interfaces. Instead, by
 * having the adapter in-between it will be responsibility of it to take care
 * of that translation.
 *
 * @see https://refactoring.guru/design-patterns/adapter
 * @see https://en.wikipedia.org/wiki/Adapter_pattern
 */
function adapterDemo() {
  // Interfaces and wiring

  interface EnglishSpeaker {
    speakEnglish(message: string): string;
  }

  class EnglishPerson implements EnglishSpeaker {
    speakEnglish(message: string) {
      return message;
    }
  }

  interface SpanishSpeaker {
    speakSpanish(message: string): string;
  }

  class SpanishPerson implements SpanishSpeaker {
    speakSpanish(message: string) {
      return message;
    }
  }

  // The (very simple) adapter

  class EnglishToSpanishAdapter implements SpanishSpeaker {
    speakSpanish(englishMessage: string) {
      return englishMessage.replace('Hello', '¡Hola!');
    }
  }

  // Usage: The English person speaks, gets the message translated, and the Spanish person responds
  const englishPerson: EnglishSpeaker = new EnglishPerson();
  const spanishPerson: SpanishPerson = new SpanishPerson();
  const englishToSpanishAdapter: SpanishSpeaker = new EnglishToSpanishAdapter();

  const wordsSaidByEnglishPerson = englishPerson.speakEnglish('Hello!');
  const translated = englishToSpanishAdapter.speakSpanish(
    wordsSaidByEnglishPerson
  );
  const wordsSaidBySpanishPerson = spanishPerson.speakSpanish(translated);

  console.log(
    `Adapter demo: English person says "${wordsSaidByEnglishPerson}"`
  );
  console.log(
    `Adapter demo: Translated to "${englishToSpanishAdapter.speakSpanish(
      wordsSaidByEnglishPerson
    )}"`
  );
  console.log(
    `Adapter demo: Spanish person says "${wordsSaidBySpanishPerson}"`
  );
}

adapterDemo();
