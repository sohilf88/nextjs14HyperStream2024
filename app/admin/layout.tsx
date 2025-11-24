

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body className=" bg-gradient-to-br from-zinc-200 to-gray-800 bg-fixed bg-cover bg-center min-w-full max-h-screen " >
        
         
          {children}
        
      </body>
    </html>
  );
}
