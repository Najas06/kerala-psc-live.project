import { signIn } from "../../auth"
import { buttonVariants } from "./ui/button"

 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className={buttonVariants({
        size:"sm",
        variant:'default'
      })}>Create an account 🏆</button>
    </form>
  )
} 