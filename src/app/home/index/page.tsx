'use client'
import Header from "../../../../components/Header"
import HomePage from "../../../../components/HomePage"

const page = () => {
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  )
}

export const runtime = 'edge';








export default page