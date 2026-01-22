import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bereket International Hotel-Display",
  description: "Displaying Hotel Items with Great UI",
};

export default function displayLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  
}>) {
    return <div>{children}</div>;
}