import Design from "@/components/Design";






export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body className=" bg-zinc-800 w-full h-screen  bg-cover" >
        
         
          {children}
        
      </body>
    </html>
  );
}
