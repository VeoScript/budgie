import { NextPage } from 'next'
import React from 'react'
import Router from 'next/router'
import Loading from '../../layouts/loading'

const MyBudgetIndex: NextPage = () => {
  React.useEffect(() => {
    Router.replace('/')
  }, [])
  return (
    <Loading />
  )
}

export default MyBudgetIndex