const meta = {
    help: 'Shows help for the command',
    tip: '',
}

function main() {
    return {
        meta,
        require: [],
        execute: (args = []) => {
            if (args.length >= 1 && lib[args[0]] && !/help/.test(args[0])) {
                const module = lib[args[0]]()
                log(module.meta && module.meta.help
                    ? module.meta.help
                    : 'This command does not support help')
            } else if (args.length <= 0 || /help/.test(args[0])) {
                const entry = Object.entries(lib).sort(), help = []
                for (let i = 0; i < entry.length; i++) {
                    const [name, moduleFn] = entry[i]
                    const module = moduleFn()
                    if (!/^\W/.test(name) && !module.meta.hidden) {
                        help.push(module.meta && module.meta.help && false
                            ? `${name} - ${module.meta.help}` : name)
                    }
                }
                log(help.join(', '))
            }
        },
    }
}