"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function CreateMeme() {
  const [meme, setMeme] = useState<FileList | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeme(event.target.files);
  };

  return (
    <section className="px-5 mt-5">
      <h1 className="text-[#B7CAD4] font-bold text-base">
        Create Meme
      </h1>
      <div className="mt-10 ">
        <div className="w-full border-dashed border border-[#F2F2F2] rounded-lg
        h-28 flex items-center justify-center">
          <form>
            <div className="flex items-center gap-1">
            <input type="file" className="block w-full text-sm text-slate-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
            file:bg-violet-50 file:text-[#B7CAD4]
            hover:file:bg-gray-300"
            onChange={handleFileChange}
            />
            <IoCloudUploadOutline fontSize={25} />
            </div>
          </form>

        </div>
      </div>

      <div>

      </div>
    </section>
  )
}
