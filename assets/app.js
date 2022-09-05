(async function() {
    'use strict'

    globalThis.eval = ['is', 'this', 'a', 'bit', 'dangerous', '?']
    globalThis.query = new Function('s', 'return document.querySelectorAll(s)')
    globalThis.query0 = new Function('s', 'return document.querySelector(s)')
    globalThis.ctrlR = new Function('location.reload()')
    globalThis.render = (new Function('return document.querySelector(\'#render\')'))()
    globalThis.getRender = new Function('return document.querySelector(\'#render\')')
    globalThis.__version__ = '0.5.3'

    const mul = (cst, ...value) => console.log(`⋯ ${cst}${value.map(f => `\n  -> ${f}`).join('')}`)
    const end = (...clk) => { return { e: res => res(clk) } }

    function subfab(...func) {
        for (let i = 0; i < func.length; i++) {
            const fab = func[i](), symbols = ['ƒ', '├', '└']
            try {
                if (fab.e) fab.e(n => {
                    console.log(`${symbols[0]} ${func[i].name}`, n.map((f, i, a) => {
                        return `\n  ${symbols[a.length - 1 !== i ? 1 : 2]} ${f}`
                    }).join(''))
                })
            } catch { /** */ }
        }
    }

    function commandHandle() {
        const dprefix = 'town'
        const close = /close|home|town/
        const timing = 100
    
        globalThis.__command = (data, prefix) => {
            if (!prefix) prefix = dprefix
            parse(data).end(f => {
                const [name, ...args] = f
                const _title = title.textContent.replace(/\s+/g, '')
                if (_title !== prefix) {
                    const module = lib[_title]()
                    if (close.test(name)) {
                        if (module.oncomplete) module.oncomplete()
                        text(prefix)
                        if (__terminal_placeholder) __terminal_placeholder()
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
                                if (__terminal_placeholder && module.meta.tip) {
                                    __terminal_placeholder(module.meta.tip)
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
        return end(!!globalThis.StyleDefinition)
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
        return end(!!globalThis.unbind && !!globalThis.bind)
    }
    function library() {
        const lp = new Proxy({}, {
            get: (target, name) => name in target ? target[name] : undefined,
            set(target, name, value) {
                if (value().onload) value().onload()
                target[name] = value
            },
        })
        const options = {}
        const cdn = 'https://cdn.mesatown.org'

        if (!globalThis.lib) globalThis.lib = lp
        globalThis.AddLibrary = function(...src) {
            if (!globalThis.glib) globalThis.glib = {}
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
            const script = await fetch(url, options).then(r => r.text())
            return `(()=>{${script};globalThis.lib.${name}=${main}})()`.replace(/\r\n\s+/g, '\r\n ')
        }
        async function add(src) {
            src = location.hostname !== 'localhost' ? src.replace(/^\./, cdn) : src
            if (/\.js$/.test(src)) create(await get(src))
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

        return end(!!globalThis.AddLibrary)
    }
    function linked() {
        let _parent, _modal
        globalThis.__link_modal = function(components = [], detailCallback = {}) {
            components.forEach(f => {
                if (f.type === 0) {
                    _parent = f.component.parentElement
                    _modal = f.component
                    f.component.remove()
                } else if (f.type === 1) {
                    if (f.component) {
                        f.component.addEventListener('click', e => {
                            detailCallback[f.details](e, _modal)
                        })
                    }
                } else { /** */ }
            })
        }
        globalThis.FloatLinkModal = function(url) {
            _parent.appendChild(_modal)
            _modal.querySelector('[is=\'modal-url\']').textContent = url
            _modal.dataset.modalState = 1
        }
    }
    function logger() {
        const defaultDur = 6750
        globalThis.Log = []
        globalThis.__logger = (text, attr) => {
            function create(content, options, parent) {
                if (typeof content === 'undefined' && typeof options !== 'undefined') return
                options.duration = options.duration ?? defaultDur
                const n = document.createElement(text.tagName)
                for (let i = 0; i < attr.length; i++) {
                    n.setAttribute(attr[i], text.getAttribute(attr[i]))
                }
                n.style.setProperty('animation', style.exist('fade') && options.duration > 0
                    ? `780ms cubic-bezier(0.55, 0.09, 0.68, 0.53) ${
                        options.duration, keyframe = style.getProperty('fade')
                    }ms both ${keyframe}` : 'none')
                if (options.white) n.style.setProperty('white-space', options.white === 'break' ? 'pre-line' : 'nowrap')
                if (options.name) n.id = options.name
                if (options) Object.keys(options).forEach(f => n.style.setProperty(f, options[f]))
                options.html ? n.innerHTML = content : n.textContent = content
                Log.push(n)
                parent.appendChild(n)
            }
            if (typeof text === 'string') text = document.querySelector(text)
            try {
                if (text.tagName) {
                    const parent = text.parentNode, opts = { duration: defaultDur, white: 'break' }
                    globalThis.log = (...data) => create(data.join(), opts, parent)
                    globalThis.deb = (data, options = { ...opts, html: true }) => create(data, options, parent)
                    text.remove()
                }
            } catch { /** */ }
        }
    }
    function roll() {
        globalThis.__scroll = (target, alway = false) => {
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
    }
    function terminal() {
        const blank = String.fromCharCode(65279)
        let defaultValue, placeholder

        globalThis.__terminal = function(text, ph) {
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
                        __command(terminal.textContent)
                        terminal.textContent = ''
                    }
                }
            })
            terminal.addEventListener('paste', e => {
                e.preventDefault()
                document.execCommand('insertHTML', false, (e.originalEvent || e).clipboardData.getData('text/plain'))
            })
        }
        globalThis.__terminal_placeholder = function(content = null) {
            placeholder.setAttribute('data-placeholder', content ?? defaultValue)
        }
        globalThis.ext = function(data) {
            __command(data)
        }
        return end(!!globalThis.ext)
    }

    document.addEventListener('DOMContentLoaded', d => {
        if (platform.version.indexOf('0.0.1') != -1) {
            const len = query('link').length + query('script').length
            console.info(`%c⠀⠀loaded%c ${
                String(len).length === 1 ? `0${len}` : len
            }%csources`,
                'color: rgb(195, 195, 195); background: rgb(5, 7, 7)',
                'color: rgb(5, 7, 7); background: rgb(246, 247, 250)',
                'color: rgb(195, 195, 195); background: rgb(5, 7, 7)')
        }
        mul(`mt.node${d.target.nodeName}`, d.type, d.returnValue)
        //#region
        console.groupCollapsed('mt?.list')
        subfab(logger, roll, define, input, library, linked, commandHandle, terminal)
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
        StyleDefinition({ fade: 'fadeoutmsg' })
        __logger('[is*=\'logger\']', ['class', 'style'])
        __terminal('[is*=\'terminal\']', '[is*=\'placeholder\']')
        __scroll('[is*=\'scroll\']', true)
        AddLibrary('./e/readme.js')
        __link_modal([
            { type: 0, component: query0('[is*=\'modal link\']') },
            { type: 1, details: 'connect', component: query0('[is*=\'modal-0\']') },
            { type: 1, details: 'cancel', component: query0('[is*=\'modal-1\']') },
            { type: 1, details: 'cancel', component: query0('[is*=\'modal_blank\']') },
        ], {
            cancel: (_e, c) => c.dataset.modalState = 0,
            connect: (_e, c) => {
                const url = c.querySelector('[is=\'modal-url\']').textContent
                window.open(url, '_blank')
                c.dataset.modalState = 0
            }
        })

        if (platform.name.indexOf('Safari') != -1 && query0('body').dataset.framework === 'pure') {
            console.warn('The bug has been found where elements are not visible when scrolling in Safari.')
            deb('⚠ The bug has been found where elements are not visible when scrolling in Safari.', {
                color: 'rgb(136, 55, 56)',
                duration: 0,
            })
        }
    }

    function hook(e) {
        e.preventDefault()
        FloatLinkModal(e.target.href)
    }

    for (;;) {
        const a = query('a')
        for (let i = 0; i < a.length; i++) {
            if (!a[i].onclick || a[i].onclick !== hook) {
                a[i].onclick = hook
            }
        }
        try {
            if (typeof globalThis.eval !== 'object' && !Array.isArray(globalThis.eval))
                if (globalThis.eval.sort().filter(f => /^\w/.test(f)).map(f => f[0]).join('') !== 'abdit')
                    ctrlR('+')
        } catch {   ctrlR()  }
        await (new Promise(r => setTimeout(r, 10)))
    }
})()
