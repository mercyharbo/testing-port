'use client'

import {
  AboutSection,
  Banner,
  CommunitySection,
  HeroSection,
  HowToSection,
} from '@/src/components/export_components'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Banner label='Sign up/Log in' />
      <AboutSection />
      <HowToSection />
      <Banner label='Get started' />
      <CommunitySection />
    </main>
  )
}

export default Home
