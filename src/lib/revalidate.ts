import { revalidatePath } from "next/cache";

export function revalidateSiteContent() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/services");
  revalidatePath("/contact");
}
