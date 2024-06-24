import UserTabs from "@/components/shared/UserTabs";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import Link from "next/link"
import { getUserById } from "@/actions/user.actions";
import ChangePhotoControl from "@/components/shared/ChangePhotoControl";
import { defaultProfile } from "@/lib/constants";

export default async function Profile() {
  const currentUser = await getUserById()
  const parsedUser = JSON.parse(currentUser)

  return (
    <section className="bg-black px-5">
      <section className="mt-5">
        <section className="relative border border-red-500">
          <Image
           src={parsedUser.image || defaultProfile}
           width={100}
           height={100}
           alt="avatar"
           className="absolute top-0 left-0 rounded-full"
          />
          <ChangePhotoControl />
          <div className="absolute top-0 right-6">
            <Link href="/user/settings">
             <CiEdit fontSize={23} className="text-white" />
            </Link>
          </div>
        </section>

        <section className="mt-24">
         <h1 className="text-[#f2f2f2] text-2xl font-bold">{parsedUser.username}</h1>
         <p className="text-sm italic text-gray-400">{parsedUser.rank}</p>
         <UserTabs />
        </section>
      </section>
    </section>
  )
}