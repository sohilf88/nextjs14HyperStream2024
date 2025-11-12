import Design from "@/components/Design";
import Firework from "@/components/firework";







export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Firework/>  */}
      <Design></Design>
   
      <body className="bg-background w-full h-screen bg-no-repeat bg-cover" >
        
         
          {children}
        
      </body>
    </html>
  );
}
