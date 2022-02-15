import React from 'react'

interface TypeProps {
  error: any
  errors: any
}

// Custom Sign in Error Function Component
const SigninError: React.FC<TypeProps> = ({ error, errors }) => {

  const errorMessage = error && (errors[error] ?? errors.default)

  return (
    <div>{ errorMessage }</div>
  )
}

export default SigninError