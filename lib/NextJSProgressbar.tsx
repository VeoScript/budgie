import React from 'react'
import NextNprogress from 'nextjs-progressbar'

const NextJSProgress: React.FC = () => {
  return (
    <NextNprogress
      color="#1042B6
      linear-gradient(
        to right,
        #5182EF,
        #346BED,
        #1453E7,
        #346BED,
        #1042B6
      );"
      startPosition={0.3}
      stopDelayMs={200}
      height={4}
      showOnShallow={true}
      options={{ easing: 'ease', speed: 500 }}
    />
  )
}

export default NextJSProgress