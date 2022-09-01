function main() {
    return {
        meta: {
            help: 'test ((5 + 3) * 12 / 3) - 32',
            lib: '{num} {any:sign} ...',
        },
        require: ['any*'],
        execute: (args) => {
            console.log(args.join(''))
        },
    }
}