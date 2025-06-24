import htmlmin from 'html-minifier'
import markdownIt from 'markdown-it'
import random from 'lodash/random.js'

const md = markdownIt()

const minify = (content) =>
    htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true
    })

const Spinner = () => {
    const layer = (
        index
    ) => `<div class="spinner__layer spinner__layer--${index}">
        <div class="spinner__circle-clipper spinner__left">
            <div class="spinner__circle"></div>
        </div>
        <div class="spinner__gap-patch">
            <div class="spinner__circle"></div>
        </div>
        <div class="spinner__circle-clipper spinner__right">
            <div class="spinner__circle"></div>
        </div>
    </div>`

    const layers = []
    for (let i = 1; i <= 4; i++) {
        layers.push(layer(i))
    }
    const output = `<div class="spinner">
        <div class="spinner__layercontainer">${layers.join('')}</div>
    </div>`

    return minify(output)
}

const Icon = (iconName, useInline = false) => {
    const spriteUrl = '/assets/icons/icons.sprite.svg'
    const iconId = `#svg-${iconName}`
    const href = useInline ? iconId : spriteUrl + iconId

    const output = `<svg class="icon icon--${iconName}" role="img" aria-hidden="true" width="24" height="24">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${href}"></use>
    </svg>`

    return minify(output)
}

const Callout = (content, type = 'info') => {
    let icon

    switch (type) {
        case 'action':
            icon = 'check'
            break

        case 'warning':
            icon = 'warning'
            break

        case 'tip':
            icon = 'lightbulb'
            break

        case 'info':
        default:
            icon = 'info'
            break
    }

    const output = `<div class="callout callout--${type}">
        <span class="callout__icon">${Icon(icon)}</span>
        <div class="callout__content">${md.render(content)}</div>
    </div>`

    return minify(output)
}

export default {
    Spinner,
    Icon,
    Callout
}
