const meta = {
    help: 'Shows the history to be continuously developed',
    short: '{str:type}',
    version: '0.4',
}

function addLib(name, data) {
    function main() { return data }
    if (Array.isArray(name)) {
        name.forEach(f => lib[f] = main)
    } else lib[name] = main
}

function main() {
    const parvar = {
        info: {
            alias: ['i'],
            info() {
                log(`In version ${meta.version}
                    \r\nadded Bind (for details, use [help bind])
                    \r\nApostrophes and quotes are no longer the same thing.
                    Input box has been expanded to make it easier to see.`)
            },
        },
        help: {
            alias: ['?'],
            help() {
                const aliases = []
                for (const entry of Object.entries(parvar)) {
                    const [name, data] = entry
                    aliases.push(name)
                    data.alias.forEach(f => {
                        if (!aliases.find(e => e === f))
                            aliases.push(f)
                    })
                }
                log(aliases.sort().join(', '))
            },
        },
        'nodes': {
            doc: () => {
                console.groupCollapsed('⋯ mt.node')
                console.log(document)
                console.log(sessionStorage)
                console.log(localStorage)
                console.groupEnd()
            }
        },
        version: {
            alias: ['ver'],
            version() {
                log(`v${meta.version}`)
            },
        }
    }

    addLib('.mintchoco', {
        meta: { help: 'don\'t ask me' },
        execute: () => log('I saw something in chocolate.\nThat is alien food?'),
    })
    addLib('.hawaiipizza', {
        meta: { help: 'don\'t ask me' },
        execute: () => log('I can\'t even imagine a hot pineapple'),
    })
    addLib('.nft', {
        meta: { help: 'The NFT' },
        execute: () => log('Not-Fried Tomatoes look delicious'),
    })
    addLib('#type', {
        meta: { help: 'mod.type.collection' },
        execute: () => Library('./mod/type/collection.json'),
    })

    return {
        meta,
        require: ['str'],
        execute: (args) => {
            for (const entry of Object.entries(parvar)) {
                const [name, data] = entry
                const alias = data.alias ?? []
                alias.push(name)
                if (alias.filter(f => f === args[0]).length === 1) {
                    for (const v in data) {
                        const l = data[v]
                        if (typeof l === 'function') l()
                    }
                }
            }
        },
    }
}