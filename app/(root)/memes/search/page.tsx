"use client"

import { searchMemeWithTag } from "@/actions/meme.actions";
import MasonryLayout from "@/components/shared/MasonryLayout";
import { Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function Search() {

  const [searchTerm, setSearchTerm] = useState("")
  const [searchedMeme, setSearchedMeme] = useState<Meme[] | null>(null)

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const searchResults = await searchMemeWithTag(searchTerm)
    setSearchedMeme(JSON.parse(searchResults))
  }

  return (
    <section className="w-full max-h-full">
     <h1 className="text-2xl font-extrabold text-white">Search</h1>
     <form onSubmit={handleSearch} className="w-full h-full">
      <Input
       type="text"
       placeholder="#tag"
       className="my-2"
       value={searchTerm}
       onValueChange={setSearchTerm}
      />
      <button type="submit" hidden></button>
     </form>
     <section className="w-full max-h-full mt-5">
      <MasonryLayout memes={searchedMeme || []} />
     </section>
    </section>
  )
}
