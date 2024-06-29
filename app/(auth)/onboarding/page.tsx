import { getUserById, getUserId } from "@/actions/user.actions"
import { redirect } from "next/navigation"
import AccountProfile from "@/components/shared/AccountProfile";


export default async function Onboarding() {
  const currentUser: any = await getUserById()

  const userId = await getUserId()

  const parsedCurrentUser = JSON.parse(currentUser)

  if (parsedCurrentUser?.onboardered) {
    redirect("/memes/feed")
  }

  return (
    <section>
     <section className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[40%] mx-auto mt-7">
      <h1 className="text-2xl font-extrabold">Onboarding</h1>
      <p className="text-base mb-10">
       Complete your profile now to use Giggle
      </p>
      <AccountProfile
       userData={parsedCurrentUser}
      />
     </section>
    </section>
  )
}
