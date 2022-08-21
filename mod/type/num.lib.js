function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the numeric type',
            short: '{number:content}',
        },
        require: ['num*'],
        execute: args => {
            log(args)
        },
    }
}