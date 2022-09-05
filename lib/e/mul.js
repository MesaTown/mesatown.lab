function main() {
    return {
        meta: {
            help: 'mul 8 8',
            tip: '{num} {num:mulnum} ...',
        },
        require: ['num*'],
        execute: (args) => {
            let num = args[0]
            for (let i = 1; i < args.length; i++) num *= args[i]
            log(`value.mul -> ${num}`)
        },
    }
}