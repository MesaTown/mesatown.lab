function addVModule(name, data) {
    function main() { return data }
    if (Array.isArray(name)) {
        name.forEach(f => lib[f] = main)
    } else lib[name] = main
}

function finish() {
    localStorage.setItem('allow-readme', true)
    AddLibrary('./mod/std/collection.json', './mod/e/collection.json')
    for (let i = 0; i < Log.length; i++) Log[i].remove()
    deb(`<span>
        mesatown-project/version:${globalThis.__version__}
        <br>Enter <span class="px-1 fw-bold">help</span> to display the commands.
        </span>`, { duration: 0, html: true })
    __terminal_placeholder('help {command?}')
    setInterval(() => {
        if (lib.allow) delete lib.allow
        if (lib.readme) delete lib.readme
    }, 10)
}

function main() {
    return {
        meta: { tip: '' },
        require: ['str*'],
        execute: () => {},
        onload: () => {
            if (localStorage.getItem('allow-readme') !== 'true') {
                __terminal_placeholder('{allow}')
                deb(`<div class="d-flex">
                    <h3 style="font-size: calc(1rem + 0.4vw)">What is Mesa Town</h3>
                    It started with soyhi\'s personal project.
                    <br>I want to make the most of the features available in browser.
                    </div>
                    <div class="d-flex flex-column mt-3">
                    <h4 class="fs-6" style="font-size: calc(1rem + 0.4vw)">1. LICENSE ────</h4>
                    <div style="font-size: calc(1rem * 0.75)">
                    The MIT License (MIT)
                    <br><br>Copyright (c) 2022 soyhi
                    <br><br>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    <br><br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                    <br><br>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    </div>
                    </div>
                    <div class="d-flex flex-column mt-3">
                    <h4 class="fs-6" style="font-size: calc(1rem + 0.4vw)">2. THIRD-PARTY ────</h4>
                    The third-party libraries used for the web are as follows:
                    <div class="ms-4">
                    Bootstrap ─ <a href="https://getbootstrap.com/docs/5.2/about/license" target="_blank">view license</a>
                    <br>platform.js ─ <a href="https://github.com/bestiejs/platform.js/blob/master/LICENSE" target="_blank">view license</a>
                    </div>
                    </div>
                    <div class="d-flex flex-column mt-3">
                    <h4 class="fs-6" style="font-size: calc(1rem + 0.4vw)">3. PRIVACY ────</h4>
                    The primary sources used on the web, including third-party libraries, never collect personal data.
                    <br>Keep in mind that you cannot take action against privacy violations through external imported modules and scripts.
                    </div>
                    <div class="d-flex flex-column mt-3">
                    <h4 class="fs-6" style="font-size: calc(1rem + 0.4vw)">4. WRITE ────</h4>
                    If you write modules and scripts,
                    <br>Please observe the following:
                    <div class="ms-4">
                    Do not collect personal data.
                    <br>Don't write modules with unclear intent.
                    </div>
                    </div>
                    <div class="d-flex mt-3">
                    <span class="pe-1 fw-bold">/README/</span> may be modified in the future.
                    </div>
                    <div class="d-flex mt-3">
                    If you agree, please enter <span class="ps-1 fw-bold">allow</span>.
                    </div>`
                , {
                    duration: 0, html: true,
                    'flex-direction': 'column'
                })

                addVModule(['allow'], {
                    meta: { tip: '' },
                    execute: () => finish(),
                })
            } else finish()
        }
    }
}