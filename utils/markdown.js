import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

const anchorSlugify = (s) =>
    encodeURIComponent(
        'h-' +
            String(s)
                .trim()
                .toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, '')
                .replace(/\s+/g, '-')
    )

const markdown = markdownIt({
    html: true,
    breaks: true,
    typographer: true
}).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: '#',
        class: 'heading-anchor',
        placement: 'before'
    }),
    permalinkAttrs: () => ({ 'aria-hidden': true }),
    level: 2,
    slugify: anchorSlugify
})

export default markdown
