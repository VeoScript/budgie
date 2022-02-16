import React from 'react'

interface TypeProps {
  width: number,
  height: number,
  color: string
}

const Spinner: React.FC<TypeProps> = ({ width, height, color }) => {
  return (
    <svg width={ width } height={ height } viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" color={ color }><g><path d="M10.998 22a.846.846 0 010-1.692 9.308 9.308 0 000-18.616 9.286 9.286 0 00-7.205 3.416.846.846 0 11-1.31-1.072A10.978 10.978 0 0110.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z"></path><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 11 11" to="360 11 11" dur=".6s" calcMode="linear" repeatCount="indefinite"></animateTransform></g></svg>
  )
}

export default Spinner