export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-800 bg-loginImage w-full h-screen bg-no-repeat bg-cover" >
        
         
          {children}
        
      </body>
    </html>
  );
}
