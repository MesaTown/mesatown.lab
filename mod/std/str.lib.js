// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['str*'],
        execute: args => {
            log(args)
        },
    }
}