import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import TopBar from '@/components/shared/Topbar' 
{/* There's some kind of bug that happens with TypeScript where if you save a component file, and
then adjust the casing, you'll receive errors. Something somewhere is being saved, and not adapting to the
file path being renamed. */}

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout