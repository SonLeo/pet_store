import styles from './page.module.css'
import Header from '../views/Header/Header'
import 'swiper/css'
import Slider from '../views/Homepage/1Slider/Slider'
import './globals.css'
import HomeBanner from '../views/Homepage/2BannerProducts/BannerProduct'
import Deals from '../views/Homepage/3Deals/Deals'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Slider />
      <HomeBanner />
      <Deals />
    </main>
  )
}
