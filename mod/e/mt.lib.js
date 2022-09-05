const meta = {
    help: 'Shows the history to be continuously developed',
    tip: '{str:type}',
}

function addVModule(name, data) {
    function main() { return data }
    if (Array.isArray(name)) {
        name.forEach(f => lib[f] = main)
    } else lib[name] = main
}

const conditionRegex = /^(\/|-{2}|:)(.+)/
let timecount = 0

function main() {
    const parvar = {
        info: {
            alias: ['i'],
            info() {
                const version = __version__,
                contents = [
                    'Fixed small bugs and features',
                ]
                log(
                    `In version ${version}\n`
                    + contents.map((f, i, a) => {
                        return a.length - 1 === i
                        ? f.replace(/^/, '└─ ').replace(/\n/g, '\n ⠀⠀⠀ ')
                        : f.replace(/^/, '├─ ').replace(/\n/g, '\n│ ⠀⠀')
                    }).join('\n')
                )
            }
        },
        help: {
            alias: ['?'],
            help() {
                const aliases = []
                for (const entry of Object.entries(parvar)) {
                    const [name, data] = entry
                    aliases.push(name)
                    if (data.alias) {
                        data.alias.forEach(f => {
                            if (!aliases.find(e => e === f))
                                aliases.push(f)
                        })
                    }
                }
                log(aliases.sort().join(', '))
            }
        },
        nodes: {
            doc() {
                console.groupCollapsed('⋯ mt.node')
                console.log(document)
                console.log(sessionStorage)
                console.log(localStorage)
                console.groupEnd()
            }
        },
        qload: {
            quick() {
                AddLibrary(
                    './mod/type/collection.json',
                    './mod/e/add.js',
                    './mod/e/sub.js',
                    './mod/e/mul.js',
                    './mod/e/div.js',
                )
            }
        },
        get: {
            run(...args) {
                const [key, condition] = args
                if (conditionRegex.test(condition)) {
                    const property = conditionRegex.exec(condition)[2]
                    switch(property) {
                        default: break
                        case 'local':
                            if (localStorage.getItem(key)) {
                                log(`Get the value from ${key}::*${property}\n> ${
                                    localStorage.getItem(key)
                                }`)
                            } break
                        case 'session':
                            if (sessionStorage.getItem(key)) {
                                log(`Get the value from ${key}::*${property}\n> ${
                                    sessionStorage.getItem(key)
                                }`)
                            } break
                    }
                }
            }
        },
        set: {
            run(...args) {
                let [key, value, condition] = args
                if (conditionRegex.test(condition)) {
                    const property = conditionRegex.exec(condition)[2]
                    if (localStorage.getItem(key) && property === 'local') {
                        if (/^(true|false)/.test(localStorage.getItem(key))) {
                            value = /^t/.test(value) ? true : false
                        }
                        localStorage.setItem(key, value)
                        log(`The value ${value} was assigned to ${key}::!${property}`)
                    } else if (property === 'session') {
                        sessionStorage.setItem(key, value)
                        log(`The value ${value} was assigned to ${key}::${property}`)
                    }
                }
            }
        },
        version: {
            alias: ['ver'],
            version() {
                log(`v${__version__}`)
            }
        }
    }

    addVModule(['now', 'time'], {
        meta: { help: 'Display the current time' },
        execute: () => {
            function tds(num) {
                return String(num).length === 1
                    ? num = `0${num}` : num
            }
            function getNow() {
                const now = new Date(),
                merid = now.getHours() <= 12 ? 'am' : 'pm',
                hours = tds(now.getHours() > 12 ? now.getHours() - 12 : now.getHours()),
                minutes = tds(now.getMinutes()),
                seconds = tds(now.getSeconds())
                return `${merid} ${hours}:${minutes}:${seconds}`
            }
            const count = timecount
            deb(getNow(), {
                name: `time${count}`,
                duration: 0, html: true,
                height: '28pt',
                color: 'rgb(181, 181, 181)',
                'font-size': '16pt',
            })
            setInterval(() => query0(`#time${count}`).textContent = getNow(), 1)
            timecount++
        },
    })
    addVModule('re', {
        meta: { help: 'Reload the page', hidden: true },
        execute: () => ctrlR(),
    })
    addVModule('reload', {
        meta: { help: 'Reload the page' },
        execute: () => ctrlR(),
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
                        if (typeof l === 'function') {
                            const argv = args
                            argv.shift()
                            l(...argv)
                        }
                    }
                }
            }
        },
    }
}
