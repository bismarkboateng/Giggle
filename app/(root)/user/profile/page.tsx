import UserTabs from "@/components/shared/UserTabs";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import Link from "next/link"
import { getUserById } from "@/actions/user.actions";


export default async function Profile() {
  const currentUser: string = await getUserById()
  const parsedUser = JSON.parse(currentUser)

  return (
    <section className="bg-black px-5">
      <section className="mt-5">
        <section className="relative">
          <Image
           src="https://i.redd.it/snoovatar/snoo_assets/submissions/temp/XFlyvMpkSiw_.png"
           width={150}
           height={150}
           alt="avatar frame"
          />
          <Image
           src="https://i.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfZWI5NTlhNzE1ZGZmZmU2ZjgyZjQ2MDU1MzM5ODJjNDg1OWNiMTRmZV84ODg1MTg_rare_8ac4af61-b316-4ebe-80fe-af928d199f5b.png"
           width={150}
           height={150}
           alt="avatar"
           className="absolute top-0 left-0"
          />
          <div className="absolute top-0 right-1">
            <Link href="/user/settings">
             <CiEdit fontSize={23} className="text-white" />
            </Link>
          </div>
        </section>
        <section className="mt-3">
         <h1 className="text-[#f2f2f2] text-2xl font-bold">{parsedUser.username}</h1>
         <p>{parsedUser.rank}</p>
         <UserTabs />
        </section>
      </section>
    </section>
  )
}