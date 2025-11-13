// 'use client'
 
// export default function GlobalError({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string }
//   reset: () => void
// }) {
//   return (
//     <html>
//       <body>
//         <h2>{error.message}</h2>
//         <button onClick={() => reset()}>Try again</button>
//       </body>
//     </html>
//   )
// }

'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-green-100 text-gray-800">
        <h1 className="text-2xl font-semibold mb-4">Something went wrong!</h1>
        <p className="text-sm text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
