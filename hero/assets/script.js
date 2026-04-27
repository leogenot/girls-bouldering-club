window.addEventListener("DOMContentLoaded", () => {
    const xTo = gsap.quickTo('.mwg_effect044 .duplicate', '--xpercent', {
        duration: 0.4,
        ease: "back"
    })

    const yTo = gsap.quickTo('.mwg_effect044 .duplicate', '--ypercent', {
        duration: 0.4,
        ease: "back"
    })

    const star = document.querySelector('.mwg_effect044 .container:not(.duplicate) .star')

    const rotateTo = gsap.quickTo(star, 'rotation', {
        duration: 0.4,
        ease: "power2.out"
    })

    let lastAngle = 0

    document.querySelector('.mwg_effect044').addEventListener("mousemove", (e) => {
        const mRangeX = gsap.utils.mapRange(0, window.innerWidth, 0, 100, e.clientX)
        xTo(mRangeX)

        const bound = e.target.getBoundingClientRect()
        const mRangeY = gsap.utils.mapRange(bound.top, bound.top + bound.height, 0, 100, e.clientY)
        yTo(mRangeY)

        const rect = star.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rawAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)

        // Normalize delta to [-180, 180] so the star always takes the shortest path
        let delta = rawAngle - lastAngle
        delta = ((delta + 180) % 360 + 360) % 360 - 180
        lastAngle += delta
        rotateTo(lastAngle)
    })
})
