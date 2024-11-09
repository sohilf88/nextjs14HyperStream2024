import Design from "@/components/Design";






export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Design></Design>
      <body className="bg-loginImage w-full h-screen bg-no-repeat bg-cover" >
        
         
          {children}
        
      </body>
    </html>
  );
}
