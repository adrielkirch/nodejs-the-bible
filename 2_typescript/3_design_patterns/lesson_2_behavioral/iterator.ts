/**
 * **Iterator**
 *
 * > "Provide a way to access the elements of an aggregate object
 * sequentially without exposing its underlying representation."
 *
 * It's worth mentioning first that iterators and generators are
 * natively supported in JavaScript. I mean, you already know about
 * arrays and various ways of iterating over them, or other types of
 * collections.
 *
 * The big deal with the Iterator pattern is that it's independent
 * of any language constructs, and that you can make it work as
 * flexibly as you want (and are able to code it). This allows us
 * to add entirely custom iteration capabilities, which makes sense
 * when we deal with custom-made objects.
 *
 * For our example, we are going to see a music playlist which will
 * allow getting the next song as long as there are song left
 * to play in the list.
 *
 * @see https://refactoring.guru/design-patterns/iterator
 * @see https://en.wikipedia.org/wiki/Iterator_pattern
 * @see Page 257 in `Design Patterns - Elements of Reusable Object-Oriented Software`
 */
function iteratorDemo() {
  interface Playlist {
    createIterator(): PlaylistIterator;
  }

  // The "concrete aggregate" - the playlist is pretty much what you'd expect, except that iterator
  class MyPlaylist implements Playlist {
    private tracks: string[] = [];

    addTrack(track: string) {
      this.tracks.push(track);
    }

    createIterator() {
      return new PlaylistIterator(this.tracks);
    }
  }

  interface PlaylistIterator {
    next(): string;
    hasNext(): boolean;
  }

  // The "concrete iterator" - this controls the actual position in our aggregate (data)
  class PlaylistIterator implements PlaylistIterator {
    private playlist: string[];
    private currentIndex = 0;

    constructor(playlist: string[]) {
      this.playlist = playlist;
    }

    next() {
      const track = this.playlist[this.currentIndex];
      this.currentIndex++;
      return track;
    }

    hasNext() {
      return this.currentIndex < this.playlist.length;
    }
  }

  const myPlaylist = new MyPlaylist();
  const songs = [
    '🤠 Wheeler Walker Jr. - Redneck Shit',
    "🤘 Morbid Angel - Lion's Den",
    '🎤 Open Mike Eagle - The Black Mirror Episode'
  ];
  songs.forEach((song) => myPlaylist.addTrack(song));

  const iterator = myPlaylist.createIterator();
  console.log('My Playlist:');

  // We will simply loop over all of the tracks, but you'd probably have your music app exert some more (manual) control than this
  while (iterator.hasNext()) console.log(iterator.next());
}

iteratorDemo();
