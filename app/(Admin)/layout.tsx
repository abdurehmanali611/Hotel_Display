import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Bereket International Hotel-Display-Admin",
  description: "Displaying Hotel Items with Great UI",
};

export default function displayLayoutAdmin({
    children,
  }: Readonly<{
    children: React.ReactNode;
  
}>) {
    return <div>
      {children}
      <Toaster richColors />
      </div>;
}