import { Sheet, SheetContent, SheetDescription,
    SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { MdOutlineMenu } from "react-icons/md";


export default function Sidebar() {
  return (
    <section>
      <Sheet>
       <SheetTrigger>
        <MdOutlineMenu className="lg:hidden" fontSize={25} />
       </SheetTrigger>
       <SheetContent side="left">
        <SheetHeader>
         <SheetTitle>Are you absolutely sure?</SheetTitle>
         <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
         </SheetDescription>
        </SheetHeader>
       </SheetContent>
      </Sheet>
    </section>
  )
}
