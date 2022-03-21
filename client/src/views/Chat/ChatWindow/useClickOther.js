import { useEffect, useRef } from 'react'

export default function useClickOther(ref, onClick) {
  const savedCallback = useRef()

  savedCallback.current = onClick

  useEffect(() => {
    const handler = e => {
      const { current } = ref
      current && !current.contains(e.target) && savedCallback.current(e)
    }

    for (const event of ['mousedown', 'touchstart']) {
      document.addEventListener(event, handler)
    }

    return () => {
      for (const event of ['mousedown', 'touchstart']) {
        document.removeEventListener(event, handler)
      }
    }
  }, [ref])
}
