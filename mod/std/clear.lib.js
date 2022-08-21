function main() {
    return {
        meta: {
            help: 'Clear the log',
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