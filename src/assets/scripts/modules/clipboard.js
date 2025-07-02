class ClipboardManager {
    constructor() {
        this.init()
    }

    init() {
        this.addCopyButtons()
        this.bindEvents()
    }

    addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre[class*="language-"]')
        
        codeBlocks.forEach((codeBlock) => {
            if (codeBlock.querySelector('.copy-btn')) return // Already has copy button
            
            const wrapper = document.createElement('div')
            wrapper.className = 'code-block-wrapper'
            
            const copyBtn = document.createElement('button')
            copyBtn.className = 'copy-btn'
            copyBtn.innerHTML = `
                <svg class="icon icon--copy" role="img" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="m5 15-2-2v-8a2 2 0 0 1 2-2h8l2 2"></path>
                </svg>
                <span class="copy-btn__text">Copy</span>
            `
            copyBtn.setAttribute('aria-label', 'Copy code to clipboard')
            copyBtn.setAttribute('title', 'Copy code to clipboard')
            
            // Wrap the code block
            codeBlock.parentNode.insertBefore(wrapper, codeBlock)
            wrapper.appendChild(codeBlock)
            wrapper.appendChild(copyBtn)
        })
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.copy-btn')) {
                this.copyCode(e.target.closest('.copy-btn'))
            }
        })
    }

    async copyCode(button) {
        const wrapper = button.closest('.code-block-wrapper')
        const codeBlock = wrapper.querySelector('pre code')
        const text = codeBlock.textContent

        try {
            await navigator.clipboard.writeText(text)
            this.showCopyFeedback(button, 'Copied!')
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopyTextToClipboard(text, button)
        }
    }

    fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
            const successful = document.execCommand('copy')
            if (successful) {
                this.showCopyFeedback(button, 'Copied!')
            } else {
                this.showCopyFeedback(button, 'Failed', true)
            }
        } catch (err) {
            this.showCopyFeedback(button, 'Failed', true)
        }

        document.body.removeChild(textArea)
    }

    showCopyFeedback(button, message, isError = false) {
        const textSpan = button.querySelector('.copy-btn__text')
        const originalText = textSpan.textContent
        
        textSpan.textContent = message
        button.classList.add(isError ? 'copy-btn--error' : 'copy-btn--success')
        
        setTimeout(() => {
            textSpan.textContent = originalText
            button.classList.remove('copy-btn--success', 'copy-btn--error')
        }, 2000)
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ClipboardManager())
} else {
    new ClipboardManager()
} 