





export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-loginImage w-full h-screen bg-center bg-no-repeat ">
        
         
          {children}
        
      </body>
    </html>
  );
}
