import { signOut } from "../../auth";
import { buttonVariants } from "./ui/button";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
          className: "max-sm:hidden",
        })}
      >
        Sign Out
      </button>
    </form>
  );
}
