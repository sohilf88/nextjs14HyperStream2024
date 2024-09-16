





export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-600">
        
         
          {children}
        
      </body>
    </html>
  );
}
