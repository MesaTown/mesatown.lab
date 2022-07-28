(function() {
    window.onload = () => {
        Style({ fadeout: 'fadeout' })
        Alert('#alert', ['class'])
        Shortcut()
        Library('./mod/std/app.library.json')
        Terminal('[contents-terminal]', '[terminal-placeholder]', Command)
    }
})()
