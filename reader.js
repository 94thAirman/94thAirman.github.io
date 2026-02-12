
// --- Shared UI preferences (font size + dark mode) ---
const PREF_KEY = 'dailyBiblePrefs';
function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch(e) { return {}; }
}
function savePrefs(p) {
  try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch(e) {}
}
function applyPrefs(p) {
  if (p && typeof p.fontSize === 'number') {
    document.body.style.setProperty('--font-size', p.fontSize + 'px');
  }
  document.body.classList.toggle('dark', !!(p && p.darkMode));
}

(function initPrefsUI(){
  const prefs = loadPrefs();
  if (typeof prefs.fontSize !== 'number') prefs.fontSize = 18;
  if (typeof prefs.darkMode !== 'boolean') prefs.darkMode = false;
  applyPrefs(prefs);

  const range = document.getElementById('fontRange');
  const btn = document.getElementById('darkToggle');
  if (range) {
    range.value = String(prefs.fontSize);
    range.addEventListener('input', () => {
      prefs.fontSize = Number(range.value);
      applyPrefs(prefs);
      savePrefs(prefs);
    });
  }
  if (btn) {
    btn.textContent = prefs.darkMode ? 'Dark' : 'Light';
    btn.addEventListener('click', () => {
      prefs.darkMode = !prefs.darkMode;
      btn.textContent = prefs.darkMode ? 'Dark' : 'Light';
      applyPrefs(prefs);
      savePrefs(prefs);
    });
  }
})();


// reader.js (Vue 2)
// Clean Bible Reader view (replaces the old dynamic-DOM search.js behavior)

const BOOKS_OT = {
  'genesis': 50, 'exodus': 40, 'leviticus': 27, 'numbers': 36, 'deuteronomy': 34,
  'joshua': 24, 'judges': 21, 'ruth': 4, '1 samuel': 31, '2 samuel': 24,
  '1 kings': 22, '2 kings': 25, '1 chronicles': 29, '2 chronicles': 36,
  'ezra': 10, 'nehemiah': 13, 'esther': 10, 'job': 42, 'psalms': 150,
  'proverbs': 31, 'ecclesiastes': 12, 'song of songs': 8, 'isaiah': 66,
  'jeremiah': 52, 'lamentations': 5, 'ezekiel': 48, 'daniel': 12, 'hosea': 14,
  'joel': 3, 'amos': 9, 'obadiah': 1, 'jonah': 4, 'micah': 7, 'nahum': 3,
  'habakkuk': 3, 'zephaniah': 3, 'zechariah': 14, 'malachi': 4
};

const BOOKS_NT = {
  'matthew': 28, 'mark': 16, 'luke': 24, 'john': 21, 'acts': 28, 'romans': 16,
  '1 corinthians': 16, '2 corinthians': 13, 'galatians': 6, 'ephesians': 6,
  'phillipians': 4, 'collossians': 4,
  '1 thessalonians': 5, '2 thessalonians': 3,
  '1 timothy': 6, '2 timothy': 4, 'titus': 3, 'philemon': 1, 'hebrews': 13,
  'james': 5, '1 peter': 5, '2 peter': 3, '1 john': 5, '2 john': 1,
  '3 john': 1, 'jude': 1, 'revelation': 22
};

const TRANSLATIONS = {
  'World English Bible': '',
  'King James Bible': '?translation=kjv',
  'Bible in Basic English': '?translation=bbe',
  'Open English Bible, US Edition': '?translation=oeb-us',
  'Open English Bible, Commonwealth Edition': '?translation=oeb-cw',
  'World English Bible, British Edition': '?translation=webbe',
  'João Ferreira de Almeida': '?translation=almeida',
  'Romanian (Cornilescu)': '?translation=rccv'
};

new Vue({
  el: '#reader-app',
  data: {
    testament: 'ot',
    selectedBook: '',
    selectedChapter: '',
    selectedTranslation: '',
    chapters: [],
    verses: null,
    loading: false,
    error: ''
  },
  computed: {
    translations() {
      return TRANSLATIONS;
    },
    bookList() {
      const src = this.testament === 'ot' ? BOOKS_OT : BOOKS_NT;
      return Object.keys(src);
    }
  },
  watch: {
    testament() {
      this.selectedBook = '';
      this.selectedChapter = '';
      this.selectedTranslation = '';
      this.chapters = [];
      this.verses = null;
      this.error = '';
    },
    selectedBook(newBook) {
      this.selectedChapter = '';
      this.verses = null;
      this.error = '';

      if (!newBook) {
        this.chapters = [];
        return;
      }

      const src = this.testament === 'ot' ? BOOKS_OT : BOOKS_NT;
      const maxCh = Number(src[newBook] || 0);
      this.chapters = Array.from({ length: maxCh }, (_, i) => String(i + 1));
    },
    selectedChapter() {
      if (this.selectedBook && this.selectedChapter) {
        this.loadVerses();
      }
    }
  },
  methods: {
    async loadVerses() {
      this.loading = true;
      this.error = '';
      this.verses = null;

      try {
        const qs = this.testament === 'nt' ? (this.selectedTranslation || '') : '';
        const ref = encodeURIComponent(`${this.selectedBook} ${this.selectedChapter}`);
        const url = `https://bible-api.com/${ref}${qs}`;

        const res = await axios.get(url);
        this.verses = res.data;
      } catch (e) {
        this.error = 'Couldn't load that passage. Try a different book/chapter.';
        console.log(e);
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    // Default translation for NT (World English Bible)
    this.selectedTranslation = '';
  }
});
