gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis()
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    const root = document.querySelector('.mwg_effect009')
    const sentences = root.querySelectorAll('.sentence')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')

    sentences.forEach(sentence => { wrapLettersInSpan(sentence) })

    ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
    })

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    })

    sentences.forEach((sentence, index) => {
        if (sentences[index + 1]) {
            tl.to(sentences[index], { yPercent: -20, y: '-20vh', autoAlpha: 0, ease: 'power4.in' })
            tl.to(sentences[index].querySelectorAll('span'), {
                yPercent: -20, y: '-20vh', stagger: -0.02, ease: 'power2.in'
            }, '<')
            tl.from(sentences[index + 1], { yPercent: 20, y: '20vh', autoAlpha: 0, ease: 'power4.out' }, '<')
            tl.from(sentences[index + 1].querySelectorAll('span'), {
                yPercent: 20, y: '20vh', ease: 'power2.out', stagger: -0.02
            }, '<')
        }
    })
})

function wrapLettersInSpan(element) {
    const chars = element.textContent.split('')
    element.textContent = ''
    chars.forEach(char => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? ' ' : char
        element.appendChild(span)
    })
}
