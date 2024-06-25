import { getAllMemes } from "@/actions/meme.actions"
import MasonryLayout from "@/components/shared/MasonryLayout"

export default async function Feed() {

  const allmemes = await getAllMemes()
  const memes = JSON.parse(allmemes)

  return (
    <section>
     <MasonryLayout
      memes={memes}
     />
    </section>
  )
}
