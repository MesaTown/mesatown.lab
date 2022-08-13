(function() {
    const close = /close|home|town/
    const timing = 100

    globalThis.Command = (data, prefix) => {
        parse(data).end(f => {
            const [name, ...args] = f
            const _title = title.textContent.replace(/\s+/g, '')
            if (_title !== prefix) {
                const module = lib[_title]()
                if (close.test(name)) {
                    if (module.oncomplete) module.oncomplete()
                    text(prefix)
                    if (setPlaceholder) setPlaceholder()
                }
                else if (lib[_title]) {
                    const argv = [name, ...args]
                    require(module, argv).unsatisfied(() => {})
                } else {
                    if (Alert) alert('Typed too quickly.')
                }
            } else {
                if (close.test(name)) {
                    /* any code */
                } else if (lib[name]) {
                    const module = lib[name]()
                    require(module, args).unsatisfied(() => {
                        if (args.length <= 0) {
                            if (module.onstart) module.onstart()
                            text(name)
                            if (setPlaceholder && module.meta.short)
                                setPlaceholder(module.meta.short)
                        }
                    })
                } else { /** */ }
            }
        })
    }

    function text(data) {
        if (title) {
            const a = title.textContent.split(''), b = data.split('')
            let len = a.length
            if (a.length < b.length) len += b.length - a.length
            for (let i = 0; i < len; i++) {
                (i => {
                    setTimeout(() => {
                        let char = b[i]
                        if (typeof b[i] === 'undefined') char = ' '
                        const curs = title.textContent, sub = (s, e) => curs.substring(s, e)
                        title.textContent = sub(0, i) + char + sub(i + 1, a.length)
                    }, timing * (i / 1.257))
                })(i)
            }
        }
    }
    function parse(d) {
        const chars = `${d}␛`.split('').filter(f => !/\ufeff/.test(f))
        const group = []
        let word = [], fin = [], isQuote = false

        for (let i = 0; i < chars.length; i++) {
            if (/\u241B/.test(chars[i])) {
                fin.push(word.join(''))
                group.push(fin.filter(f => f))
                word = [], fin = []
                break
            } else if (/\%/.test(chars[i])) {
                if (!isQuote) {
                    fin.push(word.join(''))
                    group.push(fin.filter(f => f))
                    word = [], fin = []
                }
            } else if (/['"]/.test(chars[i])) {
                if (isQuote) {
                    fin.push(word.join(''))
                    word = []
                    isQuote = false
                } else isQuote = true
            } else if (/\s/.test(chars[i])) {
                if (!isQuote) {
                    fin.push(word.join(''))
                    word = []
                }
                else word.push(chars[i])
            } else word.push(chars[i])
        }
        return {
            end: cb => group.forEach(f => cb(f)),
        }
    }
    function require(module, args) {
        if (module.require && args.length > 0) {
            const reqtype = []
            for (let i = 0; i < module.require.length; i++) {
                const oftype = module.require[i].toLowerCase()
                const type = /str|string/.test(oftype) ? 'string'
                : /num|number|numeric/.test(oftype) ? 'number'
                : /bool|boolean/.test(oftype) ? 'boolean'
                : /any/.test(oftype) ? 'any'
                : 'undefined'
                reqtype.push(type)
                if (/\w+\*$/.test(oftype)) {
                    for (let l = 0; l < args.length - (i + 1); l++)
                        reqtype.push(type)
                    break
                }
            }
            if (args.length >= reqtype.length) {
                let isWrong = false
                for (let i = 0; i < reqtype.length; i++) {
                    switch (reqtype[i]) {
                        case 'string':
                            args[i] = String(args[i])
                            break
                        case 'number':
                            isWrong = !/^\d+$/.test(args[i])
                            args[i] = Number(parseInt(args[i]))
                            break
                        case 'boolean':
                            isWrong = !/^(true|false)$/i.test(args[i])
                            args[i] = Boolean(/true/i.test(args[i]))
                            break
                        case 'any':
                            args[i] = /^(true|false)$/i.test(args[i]) ? Boolean(/true/i.test(args[i]))
                            : /^\d+$/.test(args[i]) ? Number(parseInt(args[i]))
                            : String(args[i])
                            break
                    }
                }
                if (!isWrong) module.execute(args)
            }
        } else if (!module.require || module.require.length <= 0) module.execute()
        else { return { unsatisfied: cb => cb() }}
        return { unsatisfied: () => {}}
    }
})()