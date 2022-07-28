// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['any*'],
        execute: args => {
            log(args)
        },
    }
}