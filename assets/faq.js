window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 768) return

    const container = document.querySelector('.mwg_effect025 .container')
    const containerW = container.clientWidth
    const cards = document.querySelectorAll('.mwg_effect025 .card')
    const cardsLength = cards.length
    const cardContent = document.querySelectorAll('.mwg_effect025 .card .content')

    let currentPortion = 0

    cards.forEach(card => {
        gsap.set(card, {
            xPercent: (Math.random() - 0.5) * 10,
            yPercent: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20,
        })
    })

    container.addEventListener("mousemove", e => {
        const mouseX = e.clientX - container.getBoundingClientRect().left
        const percentage = mouseX / containerW
        const activePortion = Math.ceil(percentage * cardsLength)

        if (currentPortion !== activePortion && activePortion > 0 && activePortion <= cardsLength) {
            if (currentPortion !== 0) { resetPortion(currentPortion - 1) }
            currentPortion = activePortion
            newPortion(currentPortion - 1)
        }
    })

    container.addEventListener("mouseleave", () => {
        if (currentPortion > 0) resetPortion(currentPortion - 1)
        currentPortion = 0
        gsap.to(cardContent, { xPercent: 0, ease: 'elastic.out(1, 0.75)', duration: 0.8 })
    })

    function resetPortion(index) {
        gsap.to(cards[index], {
            xPercent: (Math.random() - 0.5) * 10,
            yPercent: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.75)',
        })
    }

    function newPortion(i) {
        gsap.to(cards[i], {
            xPercent: 0, yPercent: 0, rotation: 0,
            duration: 0.8, scale: 1.1,
            ease: 'elastic.out(1, 0.75)'
        })
        cardContent.forEach((content, index) => {
            gsap.to(content, {
                xPercent: index !== i ? 80 / (index - i) : 0,
                ease: 'elastic.out(1, 0.75)',
                duration: 0.8
            })
        })
    }
})
