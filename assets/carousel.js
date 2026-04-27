gsap.registerPlugin(Observer)

window.addEventListener("load", () => {

    const container = document.querySelector('.mwg_effect028 .container')
    const cards = document.querySelectorAll('.mwg_effect028 .card')
    const half = container.clientWidth / 2

    const wrap = gsap.utils.wrap(-half, 0)
    const xTo = gsap.quickTo(container, "x", {
        duration: 0.5,
        ease: 'power3',
        modifiers: {
            x: gsap.utils.unitize(wrap)
        },
    })

    const rotateTo = gsap.quickTo(cards, "rotation", {
        duration: 1,
        ease: 'power3'
    })

    let total = 0
    Observer.create({
        target: container,
        type: "touch,pointer",
        onDrag: (self) => {
            total += self.deltaX
            xTo(total)

            const normalizedDelta = (self.deltaX / window.innerWidth) * 100
            rotateTo(-normalizedDelta)
        },
        onRelease: () => {
            rotateTo(0)
        },
        onStop: () => {
            rotateTo(0)
        }
    })
})
