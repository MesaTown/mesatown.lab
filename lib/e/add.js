function main() {
    return {
        meta: {
            help: 'add 16 8',
            tip: '{num} {num:addnum} ...',
        },
        require: ['num*'],
        execute: (args) => {
            let num = args[0]
            for (let i = 1; i < args.length; i++) num += args[i]
            log(`value.add -> ${num}`)
        },
    }
}