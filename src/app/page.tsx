import React from 'react'
import Hero from './components/hero'
import OurProcess from './components/our process'
import CustomerReviews from './components/customerreviews'

import About from './about/page'
import Contact from './contact/page'
import Menu from "./menu/page";




const Home = () => {
  return (
    <div>
      <Hero />
      <OurProcess  />
      
    <Menu />
    <About />
  
<Contact/>
       <CustomerReviews/>
    </div>
  )
}

export default Home;