import fs from 'fs/promises'
import path from 'path'
import memoize from 'lodash/memoize.js'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const VITE_DEV_SERVER = 'http://localhost:5173'
const MANIFEST_PATH = path.resolve(
    process.cwd(),
    'dist/.vite',
    'manifest.json'
)
const DEFAULT_ENTRY = 'src/assets/scripts/main.js'

const getManifest = memoize(async () => {
    if (!IS_PRODUCTION) return {}
    const manifest = await fs.readFile(MANIFEST_PATH)
    return JSON.parse(manifest)
})

async function getUrls(entryFilename) {
    const manifest = await getManifest()
    const entry = entryFilename || DEFAULT_ENTRY

    if (!manifest[entry]) {
        const possibleEntries = Object.values(manifest)
            .filter((chunk) => chunk.isEntry === true)
            .map((chunk) => `"${chunk.src}"`)
            .join(`, `)
        throw new Error(
            `No entry for ${entry} found in manifest.json. Valid entries: ${possibleEntries}`
        )
    }

    const { file, css } = manifest[entry]
    return {
        js: `/${file}`,
        css: css?.map((file) => `/${file}`) || []
    }
}

async function viteScriptTag(entry) {
    if (!IS_PRODUCTION) {
        return `
    <script type="module" src="${VITE_DEV_SERVER}/@vite/client"></script>
    <script type="module" src="${VITE_DEV_SERVER}/${
        entry || DEFAULT_ENTRY
    }"></script>
    `
    }
    const { js } = await getUrls(entry)
    return `<script type="module" src="${js}" defer></script>`
}

async function viteLinkStylesheetTags(entry) {
    if (!IS_PRODUCTION) return '' // In dev, Vite handles CSS injection

    const { css } = await getUrls(entry)
    return css
        .map((file) => `<link rel="stylesheet" href="${file}">`)
        .join('\n')
}

export default {
    viteScriptTag,
    viteLinkStylesheetTags
} 