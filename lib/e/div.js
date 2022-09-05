function main() {
    return {
        meta: {
            help: 'div 512 8',
            tip: '{num} {num:divnum} ...',
        },
        require: ['num*'],
        execute: (args) => {
            let num = args[0]
            for (let i = 1; i < args.length; i++) num /= args[i]
            log(`value.mul -> ${num}`)
        },
    }
}