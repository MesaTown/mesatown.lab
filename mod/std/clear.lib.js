// deno-lint-ignore no-unused-vars
function main() {
    return {
        meta: {
            help: 'Clear the log or alert',
        },
        require: [],
        execute: _args => {
            if (Log) {
                for (let i = 0; i < Log.length; i++)
                    Log[i].remove()
            }
        },
    }
}