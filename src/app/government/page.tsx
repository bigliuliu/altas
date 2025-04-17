// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponentDashboard from "./dashboardclient"
import DashBoardGoverment from "./DashoardPublic"
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponentDashboard>
      <DashBoardGoverment />
    </ClientComponentDashboard>
  )
}