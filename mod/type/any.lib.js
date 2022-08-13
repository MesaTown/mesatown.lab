function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the any type',
            short: '{any:content}',
        },
        require: ['any*'],
        execute: args => {
            log(args)
        },
    }
}