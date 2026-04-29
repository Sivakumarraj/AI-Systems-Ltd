import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${followerX - 24}px, ${followerY - 24}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    requestAnimationFrame(animate)

    const handleHover = () => {
      if (followerRef.current) followerRef.current.style.transform += ' scale(1.5)'
    }
    const handleLeave = () => {}

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:block">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <div ref={followerRef} className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:block">
        <div className="h-8 w-8 rounded-full border border-foreground/30 transition-transform duration-300" />
      </div>
      <div ref={ringRef} className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:block">
        <div className="h-12 w-12 rounded-full border border-foreground/20 opacity-40 transition-transform duration-500" />
      </div>
    </>
  )
}
