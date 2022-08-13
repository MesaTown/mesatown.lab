function main() {
    return {
        meta: { help: 'This is a module for quickly fetching urls' },
        require: [],
        execute: (args) => {
            let [target, url] = args[0].match(/:/)
            ? args[0].split(/:/) : [null, args[0]]
            url = `http://${url}`
            target = target === 's' || target === 'self' ? '_self'
            : target === 'n' || target === 'newtab'
            || target === 'b' || target === 'blank'      ? '_blank'
            : target === 'p' || target === 'parent'      ? '_parent'
            : target === 't' || target === 'top'         ? '_top'
            : null
            window.open(url, target)
        },
    }
}