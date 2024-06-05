import NavbarComponent from "@/components/shared/NavbarComponent";


export default function MemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NavbarComponent />
      {children}
    </section>
  )
}
