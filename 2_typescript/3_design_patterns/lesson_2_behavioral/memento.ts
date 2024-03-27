/**
 * **Memento**
 *
 * > "Without violating encapsulation, capture and externalize an object's
 * internal state so that the object can be restored later."
 *
 * As might be heard on the name, this pattern can "remember" things, such as
 * state, for a later point. An example use case for the pattern is to undo
 * changes.
 *
 * It includes several actors:
 * - **Memento**: Provides a protected surface to store the internal state of something (the "originator").
 * - **Originator**: This is what we actually capture (and then store in the memento).
 * - **Caretaker**: Keeps track of mementos.
 *
 * The main benefit of this pattern is that it simplifies the core logic of the
 * Originator, since we can push out parts outside of it.
 *
 * @see https://refactoring.guru/design-patterns/memento
 * @see https://en.wikipedia.org/wiki/Memento_pattern
 */
function mementoDemo() {
  class EditorMemento {
    constructor(private content: string) {
      //
    }

    getContent() {
      return this.content;
    }
  }

  // Originator
  class TextEditor {
    private content = '';

    type(text: string) {
      this.content += text;
    }

    getContent() {
      return this.content;
    }

    save(): EditorMemento {
      return new EditorMemento(this.content);
    }

    restore(memento: EditorMemento) {
      this.content = memento.getContent();
    }
  }

  // Caretaker
  class History {
    private snapshots: EditorMemento[] = [];

    push(snapshot: EditorMemento) {
      this.snapshots.push(snapshot);
    }

    pop(): EditorMemento | undefined {
      return this.snapshots.pop();
    }
  }

  // Using the text editor and undoing some of our writing
  const editor = new TextEditor();
  const history = new History();

  editor.type('I wish I was ');
  history.push(editor.save());

  editor.type('a bird');
  console.log(editor.getContent());

  const snapshot = history.pop();
  if (snapshot) editor.restore(snapshot);

  console.log(editor.getContent());
}

mementoDemo();
