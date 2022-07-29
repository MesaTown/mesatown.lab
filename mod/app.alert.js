(function() {
    globalThis.Log = []
    globalThis.Alert = (text, attr) => {
        function create(content, options, parent) {
            if (typeof content === 'undefined' && typeof options !== 'undefined') return
            const n = document.createElement(text.tagName)
            for (let i = 0; i < attr.length; i++)
                n.setAttribute(attr[i], text.getAttribute(attr[i]))
            n.style.setProperty('animation',
                style.exist('fadeout') && options.delay > 0
                ? `780ms ${
                    'cubic-bezier(0.55, 0.09, 0.68, 0.53)'
                } ${
                    options.delay, keyframe = style.getProperty('fadeout')
                }ms both ${keyframe}` : 'none'
            )
            if (options.white) {
                n.style.setProperty('white-space',
                    options.white === 'break' ? 'pre-line' : 'nowrap'
                )
            }
            n.textContent = content
            Log.push(n)
            parent.appendChild(n)
        }
        if (typeof text === 'string') text = document.querySelector(text)
        try {
            if (text.tagName) {
                const parent = text.parentNode
                globalThis.log = (...data) => create(data.join(', '), { delay: 6750 }, parent)
                alert = (data, opts = { delay: 6750 }) => create(data, opts, parent)
                text.remove()
            }
        } catch { /** */ }
    }
})()