import LeftSidebar from "@/components/shared/LeftSidebar";
import NavbarComponent from "@/components/shared/NavbarComponent";
import RightSidebar from "@/components/shared/RightSidebar";


export default function MemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavbarComponent />
      <section className="flex flex-row">
       <LeftSidebar />
       <section className="w-[97%] mx-auto md:w-[70%] lg:w-[60%] xl:w-[65%] px-3 pt-5">
        {children}
       </section>
       <RightSidebar />
      </section>
    </section>
  )
}
