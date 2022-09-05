function main() {
    return {
        meta: {
            help: 'sub 16 8',
            tip: '{num} {num:subnum} ...',
        },
        require: ['num*'],
        execute: (args) => {
            let num = args[0]
            for (let i = 1; i < args.length; i++) num -= args[i]
            log(`value.sub -> ${num}`)
        },
    }
}