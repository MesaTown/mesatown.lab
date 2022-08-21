(function() {
    globalThis.eval = ['is', 'this', 'a', 'bit', 'dangerous', '?']
    globalThis.ctrlR = new Function('location.reload()')
    globalThis.query = new Function('s', 'return document.querySelectorAll(s)')
    globalThis.query0 = new Function('s', 'return document.querySelector(s)')

    const end = fmn => { return { e: res => res(fmn) } }
    const mul = (cst, ...value) => console.log(`⋯ ${cst}${value.map(f => `\n  -> ${f}`).join('')}`)

    function commandHandle() {
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
                        if (terminalPlaceholder) terminalPlaceholder()
                    }
                    else if (lib[_title]) {
                        const argv = [name, ...args]
                        require(module, argv).unsatisfied(() => {})
                    } else {
                        if (Logger) deb('Typed too quickly.')
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
                                if (terminalPlaceholder && module.meta.short) {
                                    terminalPlaceholder(module.meta.short)
                                }
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
            const group = []; let word = [], fin = [],
            isApos = false, isQuote = false, isEntity = false
    
            for (let i = 0; i < chars.length; i++) {
                if (/\u241B/.test(chars[i])) {
                    fin.push(word.join(''))
                    group.push(fin.filter(f => f))
                    word = [], fin = []
                    break
                } else if (isEntity) {
                    word.push(chars[i])
                    isEntity = false
                } else if (/\%/.test(chars[i])) {
                    if (!isApos && !isQuote) {
                        fin.push(word.join(''))
                        group.push(fin.filter(f => f))
                        word = [], fin = []
                    }
                } else if (/[']/.test(chars[i])) {
                    if (!isApos && !isQuote) isApos = true
                    else if (isApos) {
                        fin.push(word.join(''))
                        word = []
                        isApos = false
                    } else word.push(chars[i])
                } else if (/["]/.test(chars[i])) {
                    if (!isApos && !isQuote) isQuote = true
                    else if (isQuote) {
                        fin.push(word.join(''))
                        word = []
                        isQuote = false
                    } else word.push(chars[i])
                } else if (/\\/.test(chars[i])) {
                    if (isEntity) {
                        word.push(chars[i])
                        isEntity = false
                    } else isEntity = true
                } else if (/\s/.test(chars[i])) {
                    if (!isApos && !isQuote) {
                        fin.push(word.join(''))
                        word = []
                    } else word.push(chars[i])
                } else word.push(chars[i])
            }
            return { end: cb => group.forEach(f => cb(f)) }
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
        return end('commandhandle')
    }
    function define() {
        globalThis.StyleDefinition = (entry) => {
            globalThis.style = {}
            style['getProperty'] = function get(name) { return style[name] }
            style['exist'] = function bool(name) { return style[name] ? true : false }
            entry = Object.entries(entry)
            for (let i = 0; i < entry.length; i++) {
                const [key, value] = entry[i]
                style[key] = value
            }
        }
        return end('define')
    }
    function input() {
        const bindMap = {}
        function Unbind(combo) { delete bindMap[combo] }
        function Bind(combo, callback) {
            initOnce(bindMap, ['keyup', 'keydown'])
            bindMap[combo] = callback
        }
        globalThis.unbind = Unbind
        globalThis.bind = Bind
        globalThis.macro = () => {}
    
        function initOnce (map, event = []) {
            event.forEach(e => {
                if (!window[`on${e}`])
                    window[`on${e}`] = ev => input(ev, map)
            }
        )}
    
        function input(event, map) {
            const key = Object.keys(map)
            key.forEach(f => {
                const t = parse(f)
                if (event.key.toLowerCase() === t.key
                    && event.type === t.type
                    && event.altKey === t.alt
                    && event.ctrlKey === t.ctrl
                    && event.metaKey === t.meta
                    && event.shiftKey === t.shift
                ) {
                    map[f](event)
                }
            })
        }
        function parse(combo) {
            combo = combo.toLowerCase()
            const mode = /^@/.test(combo) ? 1 : 0
            combo = mode > 0 ? combo.replace(/^(@)/, '') : combo
            const keymap = {
                key: null,
                ctrl: false, shift: false, alt: false, meta: false,
                type: mode === 1 ? 'keyup' : mode === 0 ? 'keydown' : 'input'
            }
            const val = combo.split(/\+/)
            for (let i = 0; i < val.length; i++) {
                const data = val[i]
                const max = val.length - 1
                if (i === max) keymap.key = data
                if (data in keymap) keymap[data] = true
            }
            return keymap
        }
        return end('input')
    }
    function library() {
        const lp = new Proxy({}, {
            get: (target, name) => name in target ? target[name] : undefined,
            set(target, name, value) {
                if (value().onload) value().onload()
                target[name] = value
            },
        })
    
        globalThis.Library = function(...src) {
            if (!globalThis.glib) globalThis.glib = {}
            if (!globalThis.lib) globalThis.lib = lp
            if (typeof src !== 'object') src = [src]
            for (let i = 0; i < src.length; i++) {
                /^\.\//.test(src[i])
                ? add(src[i])
                : addLibrary({ url: src[i] })
            }
        }
    
        async function get(url, name, main) {
            if (!name) name = /.+\/([\w\d]+)/.exec(url)[1]
            if (!main) main = 'main'
            const script = await fetch(url).then(r => r.text())
            return `(()=>{${script};globalThis.lib.${name}=${main}})()`.replace(/\r\n\s+/g, '\r\n ')
        }
    
        async function add(src) {
            if (/\.js$/.test(src)) {
                create(await get(src))
            } else if (/\.json$/.test(src)) {
                const temp = [],
                path = /(.+)\/.+/.exec(src),
                config = await fetch(src).then(r => r.json())
                if (config.include) {
                    for (let i = 0; i < config.include.length; i++) {
                        const libName = config.include[i]
                        temp.push(
                            await get(`${path[path.length - 1]}/${libName}.lib.js`,
                                libName,
                                config.entry)
                        )
                    }
                    create(temp.join(';'))
                }
            }
        }
        async function addLibrary(opts) {
            const url = new URL(opts.url)
            if (!url.href || !/\.js(\?.+)?/.test(url.href)) return
            const name = opts.alias ?? /.+\/([\w\d]+)/.exec(url.pathname)[1]
            const entry = opts.entry ?? null
            create(await get(url.href, name, entry))
        }
    
        function create(content) {
            const elem = document.createElement('script')
            elem.type = 'text/javascript'
            elem.text = content
            append(elem)
        }
        function append(node) {
            document.head.appendChild(node)
            node.remove()
        }

        return end('library')
    }
    function logger() {
        const defaultDelay = 6750
        globalThis.Log = []
        globalThis.Logger = (text, attr) => {
            function create(content, options, parent) {
                if (typeof content === 'undefined' && typeof options !== 'undefined') return
                options.delay = options.delay ?? defaultDelay
                const n = document.createElement(text.tagName)
                for (let i = 0; i < attr.length; i++) {
                    n.setAttribute(attr[i], text.getAttribute(attr[i]))
                }
                n.style.setProperty('animation', style.exist('fade') && options.delay > 0
                    ? `780ms cubic-bezier(0.55, 0.09, 0.68, 0.53) ${
                        options.delay, keyframe = style.getProperty('fade')
                    }ms both ${keyframe}` : 'none')
                if (options.white) n.style.setProperty('white-space', options.white === 'break' ? 'pre-line' : 'nowrap')
                if (options) Object.keys(options).forEach(f => n.style.setProperty(f, options[f]))
                n.textContent = content
                Log.push(n)
                parent.appendChild(n)
            }
            if (typeof text === 'string') text = document.querySelector(text)
            try {
                if (text.tagName) {
                    const parent = text.parentNode, opts = { delay: defaultDelay, white: 'break' }
                    globalThis.log = (...data) => create(data.join(', '), opts, parent)
                    globalThis.deb = (data, options = opts) => create(data, options, parent)
                    text.remove()
                }
            } catch { /** */ }
        }
        globalThis.Scrolling = (target, alway = false) => {
            const elems = document.querySelectorAll(target),
            scroll = obj => obj.scrollTo(obj.scrollWidth, obj.scrollHeight),
            track1 = obj => obj.children.length > 0 ? track1(obj.children[0]) : obj
            if (alway) {
                elems.forEach(f => {
                    const observer = new MutationObserver(() => scroll(f))
                    observer.observe(track1(f), { childList: true })
                })
            }
        }
        return end('logger')
    }
    function terminal() {
        const blank = String.fromCharCode(65279)
        let defaultValue, placeholder

        globalThis.Terminal = function(text, ph) {
            const terminal = document.querySelector(text)
            placeholder = document.querySelector(ph)
            defaultValue = placeholder.getAttribute('data-placeholder')
    
            terminal.focus()
            globalThis.title = document.querySelector('#title')
        
            setInterval(() => {
                if (terminal.textContent.length <= 0 && terminal.dataset.modeIndex === '1') {
                    terminal.textContent = blank
                } else if (!(new RegExp(blank).test(terminal.textContent))) {
                    const range = document.createRange()
                    const sel = window.getSelection()
                    terminal.textContent = blank + terminal.textContent
                    terminal.focus()
                    range.selectNodeContents(terminal)
                    range.collapse(true)
                    sel.removeAllRanges()
                    sel.addRange(range)
                }
                placeholder.style.opacity = terminal.innerHTML.length <= 1 ? 1 : 0
            }, 10)
        
            terminal.addEventListener('keydown', e => {
                if (e.shiftKey && (e.which === 90 || e.which === 13)) {
                    e.preventDefault()
                    console.groupCollapsed('#s+enter')
                    console.dir(e)
                    console.groupEnd()
                } else if (e.which === 13) {
                    e.preventDefault()
                    if (/\S+/.test(terminal.textContent)) {
                        Command(terminal.textContent, 'town')
                        terminal.textContent = ''
                    }
                }
            })
            terminal.addEventListener('paste', e => {
                e.preventDefault()
                document.execCommand('insertHTML', false, (e.originalEvent || e).clipboardData.getData('text/plain'))
            })
        }
        globalThis.terminalPlaceholder = function(content = null) {
            placeholder.setAttribute('data-placeholder', content ?? defaultValue)
        }
        return end('terminal')
    }

    document.addEventListener('DOMContentLoaded', d => {
        mul(`mt.node${d.target.nodeName}`, d.type, d.returnValue)
        //#region
        console.groupCollapsed('mt?.list')
        logger().e(n => mul(`app?.${n}`, !!globalThis.Logger && !!globalThis.Scrolling))
        define().e(n => mul(`app?.${n}`, !!globalThis.StyleDefinition))
        input().e(n => mul(`app?.${n}`, !!globalThis.unbind && !!globalThis.bind))
        library().e(n => mul(`app?.${n}`, !!globalThis.Library))
        commandHandle().e(n => mul(`app?.${n}`, !!globalThis.Command))
        terminal().e(n => mul(`app?.${n}`, !!globalThis.Terminal && !!globalThis.terminalPlaceholder))
        console.groupEnd()
        //#endregion
        bind('@enter', () => {
            const term = query0('[is*=\'terminal\']')
            if (document.activeElement !== term) term.focus()
        })
    })
    window.onload = d => {
        mul(`mt.node${d.target.nodeName}`, d.type, d.returnValue)
        /** +++ */
        StyleDefinition({ fade: 'fadeout' })
        Logger('#logger', ['class', 'style'])
        Library('./mod/std/collection.json', './mod/e/collection.json')
        Terminal('[is*=\'terminal\']', '[is*=\'placeholder\']')
        Scrolling('[is*=\'scroll\']', true)
        
        deb('⚠ The bug has been found where elements are not visible when scrolling in Safari.', {
            color: 'rgb(136, 55, 56)',
            delay: 0,
        })
    }
    setInterval(function() {
        try {
            if (typeof globalThis.eval !== 'object' && !Array.isArray(globalThis.eval))
                if (globalThis.eval.sort().filter(f => /^\w/.test(f)).map(f => f[0]).join('') !== 'abdit')
                    ctrlR('+')
        } catch {   ctrlR()  }
    }, 10)
})()
