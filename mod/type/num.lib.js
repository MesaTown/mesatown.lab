function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the numeric type',
            tip: '{number:content}',
        },
        require: ['num*'],
        execute: args => log(args),
    }
}