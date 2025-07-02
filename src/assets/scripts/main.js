// Module Preload
import 'vite/modulepreload-polyfill'

// Main Stylesheet
import '../styles/main.scss'

// Common Modules
import './modules/navigation'
import './modules/lazyload'
import './modules/themepicker'
import './modules/infinitescroll'
import './modules/preload'
import './modules/register-serviceworker'
import './modules/clipboard'

document.documentElement.classList.remove('no-js')
