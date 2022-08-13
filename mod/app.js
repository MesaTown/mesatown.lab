(function() {
    globalThis.eval = ['is', 'this', 'a', 'bit', 'dangerous', '?']
    globalThis.ctrlR = new Function('location.reload()')
    window.onload = () => {
        StyleDefinition({ fadeout: 'fadeout' })
        Alert('#alert', ['class'])
        Library('./mod/std/collection.json', './mod/e/collection.json')
        Terminal('[contents-terminal]', '[terminal-placeholder]', Command)
        Scrolling('[scroll]', true)
    }
    setInterval(function() {
        try {
            if (typeof globalThis.eval !== 'object' && !Array.isArray(globalThis.eval))
                if (globalThis.eval.sort().filter(f => /^\w/.test(f)).map(f => f[0]).join('') !== 'abdit')
                    ctrlR('+')
        } catch {   ctrlR()  }
    }, 10)
})() 
