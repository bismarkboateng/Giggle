import UserTabs from "@/components/shared/UserTabs";
import Image from "next/image";



export default function Profile() {

  return (
    <section className="bg-black px-5">
      <section className="mt-5">
        <section className="relative ">
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
        </section>
        <section className="mt-3">
         <h1 className="text-[#f2f2f2] text-2xl font-bold">Bismark</h1>
         <p>Novice</p>
         <UserTabs />
        </section>
      </section>
    </section>
  )
}