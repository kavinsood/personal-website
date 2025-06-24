import dotenv from 'dotenv'
dotenv.config()

import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import { eleventyImageTransformPlugin as pluginImageTransform } from '@11ty/eleventy-img'

import pluginPageAssets from 'eleventy-plugin-page-assets'
import pluginSVGSprite from 'eleventy-plugin-svg-sprite'

import filters from './utils/filters.js'
import transforms from './utils/transforms.js'
import shortcodes from './utils/shortcodes.js'
import markdown from './utils/markdown.js'
import viteHelpers from './utils/vite.js'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const CONTENT_GLOBS = {
    posts: 'src/posts/**/*.md',
    drafts: 'src/drafts/**/*.md',
    media: '*.jpg|*.png|*.gif|*.mp4|*.webp|*.webm'
}

export default function (config) {
    // Plugins
    config.addPlugin(pluginRss)
    config.addPlugin(pluginNavigation)
    config.addPlugin(pluginSyntaxHighlight)
    config.addPlugin(pluginPageAssets, {
        mode: 'directory',
        postsMatching: 'src/posts/*/*.md',
        assetsMatching: CONTENT_GLOBS.media,
        silent: true
    })
    config.addPlugin(pluginSVGSprite, {
        path: './src/assets/icons',
        outputFilepath: './dist/assets/icons/icons.sprite.svg'
    })
    config.addPlugin(pluginImageTransform, {
        extensions: 'html',
        formats: ['avif', 'auto'],
        outputDir: './dist/assets/images/processed/',
        urlPath: '/assets/images/processed/',
        widths: ['auto'],
        defaultAttributes: {
            loading: 'lazy',
            decoding: 'async'
        }
    })

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    // Shortcodes
    config.addShortcode('icon', shortcodes.icon)
    config.addPairedShortcode('callout', shortcodes.callout)

    // Vite Shortcodes
    Object.keys(viteHelpers).forEach((shortcodeName) => {
        config.addNunjucksAsyncShortcode(
            shortcodeName,
            viteHelpers[shortcodeName]
        )
    })

    // Asset Watch Targets
    config.addWatchTarget('./src/assets')

    // Markdown Parsing
    config.setLibrary('md', markdown)

    // Layouts
    config.addLayoutAlias('base', 'base.njk')
    config.addLayoutAlias('page', 'page.njk')
    config.addLayoutAlias('post', 'post.njk')
    config.addLayoutAlias('draft', 'draft.njk')

    // Pass-through files
    config.addPassthroughCopy('src/site.webmanifest')
    config.addPassthroughCopy('src/robots.txt')
    config.addPassthroughCopy('src/assets/images')
    config.addPassthroughCopy('src/assets/fonts')

    // Deep-Merge
    config.setDataDeepMerge(true)

    // Collections: Posts
    config.addCollection('posts', function (collection) {
        return collection
            .getFilteredByGlob(CONTENT_GLOBS.posts)
            .filter((item) => item.data.permalink !== false)
            .filter((item) => !(item.data.draft && IS_PRODUCTION))
    })

    // Collections: Drafts
    config.addCollection('drafts', function (collection) {
        return collection
            .getFilteredByGlob(CONTENT_GLOBS.drafts)
            .filter((item) => item.data.permalink !== false)
    })

    // Collections: Featured Posts
    config.addCollection('featured', function (collection) {
        return collection
            .getFilteredByGlob(CONTENT_GLOBS.posts)
            .filter((item) => item.data.featured)
            .sort((a, b) => b.date - a.date)
    })

    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md', '11ty.js'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
} 