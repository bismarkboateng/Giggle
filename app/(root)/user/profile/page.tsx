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
    <section className="px-0 bg-black md:px-5">
      <section className="mt-5">
        <section className="flex items-start justify-between">
          <div className="flex flex-row gap-5">
           <Image
            src={parsedUser.image || defaultProfile}
            width={100}
            height={100}
            alt="avatar"
            className="rounded-full object-cover"
           />
           <ChangePhotoControl />
          </div>

          <div className="">
            <Link href="/user/settings">
             <CiEdit fontSize={23} className="text-white cursor-pointer" />
            </Link>
          </div>
        </section>

        <section className="mt-5">
         <h1 className="text-sm text-gray-400 font-medium mb-1">@{parsedUser.username}</h1>
         <p className="text-sm italic text-gray-400"><span className="text-gray-500 font-bold">Rank: </span>{parsedUser.rank}</p>
         <UserTabs />
        </section>
      </section>
    </section>
  )
}