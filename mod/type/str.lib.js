function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the string type',
            tip: '{string:content}',
        },
        require: ['str*'],
        execute: args => log(args),
    }
}