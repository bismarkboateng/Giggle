import { Input } from "@nextui-org/react";

export default function Search() {
  return (
    <section>
     <h1 className="text-2xl font-extrabold text-white">Search</h1>
     <Input
      type="text"
      placeholder="#tag"
      className="my-2"
     />
    </section>
  )
}
