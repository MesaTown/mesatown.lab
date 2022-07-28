(function() {
    globalThis.Library = async function(lib) {
        const path = /(.+)\/.+/.exec(lib), config = await fetch(lib).then(r => r.json())
        const temp = []
        if (config.include) {
            globalThis.lib = {}
            for (let i = 0; i < config.include.length; i++) {
                const libName = config.include[i]
                let script = await fetch(`${path[path.length - 1]}/${libName}.lib.js`).then(r => r.text())
                script = `(()=>{${script};globalThis.lib.${libName}=${config.entry}})()`.replace(/\r\n\s+/g, '\r\n ')
                temp.push(script)
            }
            const libScriptNode = create(temp.join(';'))
            document.head.appendChild(libScriptNode)
            libScriptNode.remove()
        }
    }

    function create(content) {
        const elem = document.createElement('script')
        elem.type = 'text/javascript'
        elem.text = content
        return elem
    }
})()