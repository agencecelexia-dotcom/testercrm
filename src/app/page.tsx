import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  let session = null;

  try {
    session = await getServerSession(authOptions);
  } catch {
    // DB unavailable — redirect to login
  }

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
