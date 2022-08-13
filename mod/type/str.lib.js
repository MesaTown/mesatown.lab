function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the string type',
            short: '{string:content}',
        },
        require: ['str*'],
        execute: args => {
            log(args)
        },
    }
}