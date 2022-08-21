function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the boolean type',
            short: '{boolean:content}',
        },
        require: ['bool*'],
        execute: args => {
            log(args)
        },
    }
}