import { Banner } from './components/banner'
import { HowItWorks } from './components/how-it-works'
import { Events } from './components/events'
import { Reviews } from './components/reviews'
import { GiftList } from './components/gift-list'

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
