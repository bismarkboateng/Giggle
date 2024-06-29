"use client"

import { Card, CardBody } from "@nextui-org/react"
import Masonry from "react-responsive-masonry";
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

type MasonryLayoutProps = {
    memes: Meme[]
}

export default function MasonryLayout({ memes }: MasonryLayoutProps) {
  return (
    <Masonry columnsCount={3} gutter="10px" className="w-full h-screen"> 
    {memes.length === 0 && <p className="text-gray-500 text-xs md:text-base font-bold text-center">No memes found</p>}
    {memes && memes.map((meme: Meme, index) => (
      <Fragment key={meme._id}>
       <Card key={meme._id}>
       <CardBody className={`w-full ${ index % 2 ? 'h-[100px] xl:h-[200px] md:h-[100px]' : 'h-[150px] xl:h-[300px] md:h-[200px]'} flex flex-col gap-3 overflow-hidden`}>
        {meme.file && (
        <div className="relative w-full h-full overflow-hidden">
          <Link href={`/memes/${meme._id}/detail`}>
          <Image
            src={meme.file}
            alt="meme"
            loading="lazy"
            fill
            className="w-full h-full transform transition-transform duration-300 ease-in-out hover:scale-105
            object-center rounded-lg"/>
          </Link>
        </div>
        )}
       </CardBody>
       </Card>
      </Fragment>
    ))}
    </Masonry>
  )
}
