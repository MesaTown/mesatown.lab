(function() {
    globalThis.Style = (entry) => {
        globalThis.style = {}
        style['getProperty'] = function get(name) { return style[name] }
        style['exist'] = function bool(name) { return style[name] ? true : false }
        entry = Object.entries(entry)
        for (let i = 0; i < entry.length; i++) {
            const [key, value] = entry[i]
            style[key] = value
        }
    }
})()