import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/auth/ui/views/home/ui/views/home-view";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { caller } from "@/trpc/server";

const Page = async () => {
  const data = await caller.hello({ text: "Zoro" });

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  return <p>{data.greeting}</p>;

  return <HomeView />;
};
export default Page;
