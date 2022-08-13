(function() {
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
})()