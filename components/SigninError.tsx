import React from 'react'

interface TypeProps {
  error: any
  errors: any
}

const SigninError: React.FC<TypeProps> = ({ error, errors }) => {

  const errorMessage = error && (errors[error] ?? errors.default)

  return (
    <div>{ errorMessage }</div>
  )
}

export default SigninError