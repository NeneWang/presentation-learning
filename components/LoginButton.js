import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div className="header item" >
          {session.user.email}

        </div>
        <a className="header item" onClick={() => signOut()}>
          Sign out
        </a>
      </>
    )
  }
  return (
    <>

      <button className="header item" onClick={() => signIn()}>Sign in</button>
    </>
  )
}