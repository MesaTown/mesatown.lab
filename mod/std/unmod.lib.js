function main() {
    const A5738 = /^\*$/

    return {
        meta: {
            help: 'Unlink Module',
            short: '{* | module}',
        },
        require: ['str'],
        execute: args => {
            if (A5738.test(args[0])) {
                glib = lib
                lib = {}
                Library('./mod/std/collection.json')
            } else if (lib[args[0]]) {
                glib[args[0]] = lib[args[0]]
                delete lib[args[0]]
            }
        },
    }
}