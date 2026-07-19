import ElpNav from '@/components/ElpNav'
import ElpHero from '@/components/ElpHero'
import ElpEditorial from '@/components/ElpEditorial'
import ElpBirria from '@/components/ElpBirria'
import ElpKitchen from '@/components/ElpKitchen'
import ElpMenu from '@/components/ElpMenu'
import ElpGallery from '@/components/ElpGallery'
import ElpDirectOrder from '@/components/ElpDirectOrder'
import ElpOrder from '@/components/ElpOrder'
import ElpVisit from '@/components/ElpVisit'
import ElpFooter from '@/components/ElpFooter'
import ElpJsonLd from '@/components/ElpJsonLd'
import ElpStickyBar from '@/components/ElpStickyBar'
export default async function Page() {
  return (
    <>
      <ElpJsonLd />
      <ElpNav />
      <main id="main" className="pb-20 md:pb-0">
        <ElpHero />
        <ElpEditorial />
        <ElpBirria />
        <ElpKitchen />
        <ElpMenu />
        <ElpGallery />
        <ElpDirectOrder />
        <ElpOrder />
        <ElpVisit />
      </main>
      <ElpFooter />
      <ElpStickyBar />
    </>
  )
}
