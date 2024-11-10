

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body className=" bg-loginImage min-w-full max-h-screen " >
        
         
          {children}
        
      </body>
    </html>
  );
}
