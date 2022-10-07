const booksOT = {
    'genesis':'50',
    'exodus':'40',
    'leviticus':'27',
    'numbers':'36',
    'deuteronomy':'34',
    'joshua':'24',
    'judges':'21',
    'ruth':'4',
    '1 samuel':'31',
    '2 samuel':'24',
    '1 kings':'22',
    '2 kings':'25',
    '1 chronicles':'29',
    '2 chronicles':'36',
    'ezra':'10',
    'nehemiah':'13',
    'esther':'10',
    'job':'42',
    'psalms':'150',
    'proverbs':'31',
    'ecclesiastes':'12',
    'song of songs':'8',
    'isaiah':'66',
    'jeremiah':'52',
    'lamentations':'5',
    'ezekiel':'48',
    'daniel':'12',
    'hosea':'14',
    'joel':'3',
    'amos':'9',
    'obadiah':'1:1',
    'jonah':'4',
    'micah':'7',
    'nahum':'3',
    'habakkuk':'3',
    'zephaniah':'3',
    'zechariah':'14',
    'malachi':'4'
}

// let book = document.querySelector("#book")
// let chapter = document.querySelector("#chapter")

let otReader = document.querySelector('#ot-reader')

const otInputDiv = document.querySelector("#ot-input")
// bibleReader.appendChild(inputDiv)
let otBook = document.createElement('select')
label = document.createElement('label')
label.innerText = "Select a Book to Read"
otBook.appendChild(label)
otBook.setAttribute('id','ot-book')
let otChapterNum
blank = document.createElement("option")
blank.innerText = ''
otBook.appendChild(blank)

for (key in booksOT) {
    otBookName = document.createElement("option")
    otBookName.innerText = key
    otBook.appendChild(otBookName)
}
otInputDiv.appendChild(otBook)
let otChapter = ''
otBook.addEventListener('change', function() {
    otChapter = document.createElement('select')
    otChapter.setAttribute("id","ot-chapter")
    otButton = document.querySelector('#ot-button')
    otButton.addEventListener('click', function() {
        if (otChapter != '') {
            otChapter = document.querySelector("#ot-chapter")
            // alert(chapter)
            otChapter.remove()
        }
        
    })

    // book.setAttribute('type', 'select')
    otInputDiv.appendChild(otChapter)
    let otChapterRange = booksOT[otBook.value]
    // alert(chapterRange)
    for (i=1; i <= otChapterRange; i++) {
        otChapterNum = document.createElement('option')
        otChapterNum.innerText = i
        otChapter.appendChild(otChapterNum)
        
    }
    
})

const vm_ot = new Vue({
    el: "#app-ot",
    data: {
        otBibleVerses: {}
    },
    methods: {
        loadOTVerses: function() {
            axios({
                method: 'get',
                url: 'https://bible-api.com/'+otBook.value+'+'+otChapter.value

            }).then(response => {
                this.otBibleVerses = response.data
                console.log(this.otBibleVerses.reference)
            }).catch(error => {
                alert("ERROR: Make sure to select a book, and then select a chapter number from dropdown lists")
                console.log(error)
                console.log(error.response.data)
            })
        }
    }
})

// let book = document.querySelector("#book")
// let chapter = document.querySelector("#chapter")
// let chapter

let ntReader = document.querySelector('#nt-reader')

const booksNT = {
    'matthew':'28',
    'mark':'16',
    'luke':'24',
    'john':'21',
    'acts':'28',
    'romans':'16',
    '1 corinthians':'16',
    '2 corinthians':'13',
    'galatians':'6',
    'ephesians':'6',
    'phillipians':'4',
    'collossians':'4',
    '1 thessalonians':'5',
    '2 thessalonians':'3',
    '1 timothy':'6',
    '2 timothy':'4',
    'titus':'3',
    'philemon':'1',
    'hebrews':'13',
    'james':'5',
    '1 peter':'5',
    '2 peter':'3',
    '1 john':'5',
    '2 john':'1',
    '3 john':'1',
    'jude':'1',
    'revelation':'22'
}

const translations = {
    'king james bible':'?translation=kjv',
    'bible in basic english':'?translation=bbe',
    'world english bible':'',
    'open english bible, commonwealth edition':'?translation=oeb-cw',
    'world english bible, british edition':'?translation=webbe',
    'open english bible, US edition':'?translation=oeb-us',
    'joao ferreira de almeida':'?translation=almeida',
    'protestant romanian correct cornilescu version':'?translation=rccv'
}

const ntInputDiv = document.querySelector("#nt-input")
// bibleReader.appendChild(inputDiv)
let ntBook = document.createElement('select')
label = document.createElement('label')
label.innerText = "Select a Book to Read"
ntBook.appendChild(label)
ntBook.setAttribute('id','nt-book')
let ntChapterNum
blank = document.createElement("option")
blank.innerText = ''
ntBook.appendChild(blank)

for (key in booksNT) {
    ntBookName = document.createElement("option")
    ntBookName.innerText = key
    ntBook.appendChild(ntBookName)
}
ntInputDiv.appendChild(ntBook)
let ntChapter 
let ntTranslation
let ntChapterRange
let ntTranslations
ntBook.addEventListener('change', function() {
    ntChapter = document.createElement('select')
    ntChapter.setAttribute("id","nt-chapter")
    ntButton = document.querySelector('#nt-button')
    ntButton.addEventListener('click', function() {
        if (ntChapter != '') {
            ntChapter = document.querySelector("#nt-chapter")
            ntTranslations = document.querySelector('#nt-translations')
            // alert(chapter)
            ntChapter.remove()
            ntTranslations.remove()

        }
        
    })

    // book.setAttribute('type', 'select')
    ntInputDiv.appendChild(ntChapter)
    ntChapterRange = booksNT[ntBook.value]
    // alert(chapterRange)
    for (i=1; i <= ntChapterRange; i++) {
        ntChapterNum = document.createElement('option')
        ntChapterNum.innerText = i
        ntChapter.appendChild(ntChapterNum)
        // ntChapterNum = ntChapter.value
    }
    ntTranslations = document.createElement('select')
    ntTranslations.setAttribute('id','nt-translations')
    ntInputDiv.appendChild(ntTranslations)
    for (key in translations) {
        ntTranslation = document.createElement('option')

        ntTranslation.innerText = key

        ntTranslations.appendChild(ntTranslation)
    }
    
})





const vm_nt = new Vue({
    el: "#app-nt",
    data: {
        ntBibleVerses: {}
    },
    methods: {
        loadNTVerses: function() {
            axios({
                method: 'get',
                url: 'https://bible-api.com/'+ntBook.value+'+'+ntChapter.value+translations[ntTranslations.value]

            }).then(response => {
                this.ntBibleVerses = response.data
                console.log(this.ntBibleVerses.reference)
            }).catch(error => {
                alert("ERROR: Make sure to select a book, and then select a chapter number from dropdown lists")
                console.log(error)
                console.log(error.response.data)
            })
        }
    }
})