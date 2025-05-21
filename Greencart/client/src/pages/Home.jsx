import React from 'react'
import { MainBanner } from '../components/MainBanner'
import { Categories } from '../components/Categories'
import TopSellings from '../components/TopSellings'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <TopSellings/>
        <BottomBanner/>
        <NewsLetter/>
    </div>
  )
}

export default Home