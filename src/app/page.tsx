import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role) {
    switch (session.user.role) {
      case "AGENCE":
        redirect("/agence/dashboard");
      case "CLIENT":
        redirect("/client/dashboard");
      case "CLOSER":
        redirect("/closer/dashboard");
    }
  }

  redirect("/login");
}
