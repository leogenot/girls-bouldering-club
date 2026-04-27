window.addEventListener("DOMContentLoaded", () => {
    // Modifies the CSS variable --xpercent
    const xTo = gsap.quickTo('.mwg_effect044 .duplicate', '--xpercent', {
        duration: 0.4, // Changes over 0.4s
        ease: "back" // With a slight bounce at the end of the movement
    })

    // Modifies the CSS variable --ypercent
    const yTo = gsap.quickTo('.mwg_effect044 .duplicate', '--ypercent', {
        duration: 0.4, // Changes over 0.4s
        ease: "back" // With a slight bounce at the end of the movement
    })

    document.querySelector('.mwg_effect044').addEventListener("mousemove", (e) => {  
        // Maps the mouse's X position from the window width range (0 to innerWidth)  
        // to a normalized range (0 to 100)  
        const mRangeX = gsap.utils.mapRange(0, window.innerWidth, 0, 100, e.clientX)  
    
        // Update the X position smoothly  
        xTo(mRangeX)
    
        // Maps the mouse's Y position relative to the element’s bounding box  
        // to a normalized range (0 to 100)  
        const bound = e.target.getBoundingClientRect()  
        const mRangeY = gsap.utils.mapRange(bound.top, bound.top + bound.height, 0, 100, e.clientY)  
    
        // Update the Y position smoothly  
        yTo(mRangeY)
    })
})