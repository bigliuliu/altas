
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/container/Authoption'
import DashboardContainer from '@/container/DashboardContainer'
import DashboardHero from '@/components/dashboard/DashboardHero'
import DashboardProperty from '@/components/dashboard/DashboardProperty'
import DashboardGeolocator from '@/components/dashboard/DashboardGeolocator'
import { getSession } from "next-auth/react";

const ServerProtectedPage = async () => {
  // const session:any  = await getServerSession(authOptions)

  // // if (!session) {
  // //   redirect('/login')
  // // }
  // console.log("user session",session)

  // // if(session?.user?.role != "public"){
  // //   redirect("/login");
  // // }
  return (
    <DashboardContainer>
      <>
        <DashboardHero />
        <DashboardProperty />
      </>
    </DashboardContainer>
  )
}

export default ServerProtectedPage
