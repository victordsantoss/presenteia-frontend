import { Banner } from './components/Banner'
import { HowItWorks } from './components/HowItWorks'
import { Events } from './components/Events'
import { Reviews } from './components/Reviews'
import { GiftList } from './components/GiftList'

export default async function HomePage() {
  return (
    <>
      <Banner />
      <HowItWorks />
      <Events />
      <Reviews />
      <GiftList />
    </>
  )
}
