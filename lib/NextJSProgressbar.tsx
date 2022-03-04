import React from 'react'
import NextNprogress from 'nextjs-progressbar'

const NextJSProgress: React.FC = () => {
  return (
    <NextNprogress
      color="#FD5400
      linear-gradient(
        to right,
        #FEC6AB,
        #FEC6AB,
        #FE9F72,
        #FE8A52,
        #FD5400
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