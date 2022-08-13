function main() {
    const A5738 = /^\*$/
    const D364 = /^def(ault)?$/
    const S76 = /(http(s))?:(\/{2})?(\S+\.\w+)\/((.+)\.(js))/
    const I8736 = /^\.\S+(\.js(on)?)$/
    function diag(data) {
        if (S76.test(data) || I8736.test(data)) {
            Library(data)
        } else if (D364.test(data)) {
            Library('./mod/std/collection.json')
        } else if (A5738.test(data)) {
            const entry = Object.entries(glib)
            entry.forEach(([name, func]) => lib[name] = func)
        }
    }
    return {
        meta: {
            help: 'Link Module',
            short: '{* | default | src}',
        },
        require: ['str'],
        execute: args => {
            for (let i = 0; i < args.length; i++) {
                diag(args[0])
            }
        },
    }
}