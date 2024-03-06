





export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-zinc-700">
        
         
          {children}
        
      </body>
    </html>
  );
}
