(function() {
    globalThis.Terminal = function(text, placeholder, to) {
        const modeIndex = navigator.userAgent.match(/Gecko\/\d+/) ? 1 : 0,
        terminal = document.querySelector(text),
        ph = document.querySelector(placeholder)

        terminal.focus()

        globalThis.title = document.querySelector('#title')
        terminal.dataset.modeIndex = modeIndex
    
        setInterval(() => {
            if (terminal.textContent.length <= 0 && terminal.dataset.modeIndex === '1')
                terminal.textContent = String.fromCharCode(65279)
            ph.style.opacity = terminal.textContent.length <= 0 + modeIndex ? 1 : 0
        }, 10)
    
        terminal.addEventListener('keydown', e => {
            if (e.which === 90) {
                e.preventDefault()
                terminal.textContent = ''
            }
            if (e.which === 13) {
                e.preventDefault()
                if (/\S+/.test(terminal.textContent)) {
                    to(terminal.textContent, 'town')
                    terminal.textContent = ''
                }
            }
        })
        terminal.addEventListener('paste', e => {
            e.preventDefault()
            terminal.textContent += e.clipboardData.getData('text/plain')
            caretAtEnd(terminal)
        })
    }

    function caretAtEnd(elem) {
        elem.focus()
        if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
            const range = document.createRange()
            range.selectNodeContents(elem)
            range.collapse(false)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
        } else if (typeof document.body.createTextRange != 'undefined') {
            const textRange = document.body.createTextRange()
            textRange.moveToElementText(elem)
            textRange.collapse(false)
            textRange.select()
        }
    }
})()