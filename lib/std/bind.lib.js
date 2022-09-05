function main() {
    return {
        meta: {
            help: 'Assign a function to a key combo.\nIt can be inconvenient within the command.\r\n\nex; bind "ctrl+r" "location.reload()"',
            tip: '{str:combo} {str:function}',
        },
        require: ['str', 'str'],
        execute: (args) => bind(args[0], new Function(args[1])),
    }
}