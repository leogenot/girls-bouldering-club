gsap.registerPlugin(Observer)

window.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector('.mwg_effect028 .container')
    const cards = document.querySelectorAll('.mwg_effect028 .card');
    const half = container.clientWidth / 2
    const W = window.innerWidth

    const wrap = gsap.utils.wrap(-half, 0)
    const xTo = gsap.quickTo(container, "x", {
        duration: 0.5, // Will change over 0.5s
        ease: 'power3', // Non-Linear
        modifiers: {
            x: gsap.utils.unitize(wrap)
        },
    })

    const rotateTo = gsap.quickTo(cards, "rotation", {
        duration: 1, // Will change over 1s
        ease: 'power3' // Non-linear
    })

    // Use GSAP Observer
    let total = 0 
    Observer.create({
        target: container,
        type: "touch,pointer", // Handles both touch and mouse interactions
        onDrag: (self) => {
            total += self.deltaX; // Accumulate movement
            xTo(total); // Update x position

            const screenWidth = window.innerWidth;
            const normalizedDelta = (self.deltaX / screenWidth) * 100; // Delta as a percentage of screen width
            rotateTo(-normalizedDelta)
        },
        onRelease: () => {
            rotateTo(0) // reset rotation when the drag stops
        },
        onStop: () => {
            rotateTo(0) // reset rotation when the drag stops
        }
    })
})