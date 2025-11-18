

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body className=" bg-loginImage bg-fixed bg-cover bg-center min-w-full max-h-screen " >
        
         
          {children}
        
      </body>
    </html>
  );
}
