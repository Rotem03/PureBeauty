import { Routes, Route, useLocation } from 'react-router-dom'
import { TopNav } from './components/TopNav/TopNav'
import { PageLanding } from './components/Pages/Landing/PageLanding'
import { PageAuth } from './components/Pages/Auth/PageAuth'
import { PageScanner } from './components/Pages/Scanner/PageScanner'
import { PageResults } from './components/Pages/Results/PageResults'
import { PageShop } from './components/Pages/Shop/PageShop'
import { PageVanity } from './components/Pages/Vanity/PageVanity'
import { PageTutorials } from './components/Pages/Tutorials/PageTutorials'
import './index.css'

const HIDE_NAV = ['/auth']

export default function App() {
  const location = useLocation()
  const showNav = !HIDE_NAV.includes(location.pathname)

  return (
    <>
      {showNav && <TopNav />}
      <div className={showNav ? 'page-with-nav' : ''}>
        <Routes>
          <Route path="/"          element={<PageLanding />} />
          <Route path="/auth"      element={<PageAuth />} />
          <Route path="/scan"      element={<PageScanner />} />
          <Route path="/results"   element={<PageResults />} />
          <Route path="/shop"      element={<PageShop />} />
          <Route path="/tutorials" element={<PageTutorials />} />
          <Route path="/vanity"    element={<PageVanity />} />
        </Routes>
      </div>
    </>
  )
}
