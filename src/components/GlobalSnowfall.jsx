import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import { useTheme } from '../context/ThemeContext'

export default function GlobalSnowfall() {
  const { theme } = useTheme()
  const [snowflakeImages, setSnowflakeImages] = useState([])

  // Dynamically load SVG snowflakes with valid XML namespace and theme-aware colors
  useEffect(() => {
    if (typeof window === 'undefined') return

    // White/cyan in dark mode; ice-blue/sky-blue in light mode
    const color1 = theme === 'dark' ? '#ffffff' : '#3b82f6'
    const color2 = theme === 'dark' ? '#bae6fd' : '#60a5fa'

    const createSnowflakeImg = (color) => {
      const svgContent = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7L6.5 9M21 17L17.5 15M12 12L6.5 9M12 12L6.5 15M12 12V5M12 12V18.5M12 12L17.5 15M12 12L17.5 9M12 2V5M12 22V18.5M21 7L17.5 9M3 17L6.5 15M6.5 9L3 10M6.5 9L6 5.5M6.5 15L3 14M6.5 15L6 18.5M12 5L9.5 4M12 5L14.5 4M12 18.5L14.5 20M12 18.5L9.5 20M17.5 15L18 18.5M17.5 15L21 14M17.5 9L21 10M17.5 9L18 5.5" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `
      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.src = url
      return { img, url }
    }

    const item1 = createSnowflakeImg(color1)
    const item2 = createSnowflakeImg(color2)

    let loaded = 0
    const checkLoaded = () => {
      loaded++
      if (loaded >= 2) {
        setSnowflakeImages([item1.img, item2.img])
      }
    }

    item1.img.onload = checkLoaded
    item2.img.onload = checkLoaded

    return () => {
      URL.revokeObjectURL(item1.url)
      URL.revokeObjectURL(item2.url)
    }
  }, [theme])

  return (
    <Snowfall
      images={snowflakeImages.length > 0 ? snowflakeImages : undefined}
      snowflakeCount={45}
      radius={[6.0, 16.0]}
      speed={[0.6, 2.0]}
      wind={[-0.3, 0.7]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 25,
        pointerEvents: 'none',
      }}
    />
  )
}
