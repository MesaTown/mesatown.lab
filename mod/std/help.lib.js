// deno-lint-ignore no-unused-vars
function main() {
    const meta = {
        help: 'Shows help for the command',
    }
    return {
        meta,
        require: [],
        execute: (args = []) => {
            if (args.length >= 1 && lib[args[0]] && !/help/.test(args[0])) {
                const module = lib[args[0]]()
                if (module.meta && module.meta.help) {
                    alert(module.meta.help, { delay: 0, white: 'break' })
                } else {
                    log('This command does not support help')
                }
            } else if (args.length <= 0 || /help/.test(args[0])) {
                const entry = Object.entries(lib).sort(), help = []
                for (let i = 0; i < entry.length; i++) {
                    const [name, moduleFn] = entry[i]
                    const module = moduleFn()
                    if (module.meta && module.meta.help) {
                        help.push(`${name.toUpperCase()} - ${module.meta.help}`)
                    } else help.push(name)
                }
                alert(help.join('\n\n'), { delay: 0, white: 'break' })
            }
        },
    }
}