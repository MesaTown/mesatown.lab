function main() {
    const parvar = {
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
        release: {
            alias: ['rel'],
            about() {
                log(`In version ${meta.version}
                    \r\nThe standard module and type are divided, and additional modules are included
                    \r\nBuilt a module import system`)
            },
        },
        version: {
            alias: ['ver'],
            version() {
                log(`v${meta.version}`)
            },
        }
    }
    const meta = {
        help: 'Shows the history to be continuously developed',
        short: '{str:type}',
        version: 0.3,
    }
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