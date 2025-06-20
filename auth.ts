import dbConnect from "@/lib/db";
import Subscriber from "@/lib/models/subscribe";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        try {
          await dbConnect();
          const existingUser = await Subscriber.findOne({ email: user.email });
          if (!existingUser) {
            await Subscriber.create({ email: user.email });
          } else {
            console.log("User already exists");
          }
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
  },
});
