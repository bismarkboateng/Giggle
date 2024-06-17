"use client"

import { getUserById, updateUser } from "@/actions/user.actions";
import { Input, Button } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";

export default function Settings() {
  const [user, setUser] = useState({} as UserFromDb)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getUserById()
      const parsedUser: UserFromDb = JSON.parse(currentUser)

      setUser(parsedUser)
    }

    fetchCurrentUser()
  }, [])

  const handleSubmit = async (event:  FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username) return
    await updateUser({ username })
  }


  return (
    <section className="px-5 mt-10 bg-black">
      <h1 className="text-xl text-white font-bold">Settings</h1>
      <div>
        <div className="text-white text-lg font-medium mt-10">General</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
          <Input
            name="username"
            value={username || user.username}
            label="username"
            onValueChange={setUsername}
          />
          <Button type="submit" className="bg-blue-500 text-white">Save</Button>
        </form>
      </div>
    </section>
  )
}
