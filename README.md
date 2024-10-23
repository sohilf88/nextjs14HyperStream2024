This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## ant media format
https://{AMS-URL}:5443/{APP-NAME}/streams/{STREAM-ID}.m3u8
http://172.16.10.128:5080/live/streams/Wi6KGI84iHFp1217105180471.m3u8
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


Select Everything or Just Filtered

The header checkbox has three modes of operation, 'normal', 'filtered only' and 'current page'.

    colDef.headerCheckboxSelectionFilteredOnly=false: The header checkbox will select all rows when checked, and un-select all rows when unchecked. The header checkbox will update its state based on all rows.

    colDef.headerCheckboxSelectionFilteredOnly=true: The header checkbox will select only filtered rows when checked and un-select only filtered rows when unchecked. The header checkbox will update its state based only on filtered rows.

    colDef.headerCheckboxSelectionCurrentPageOnly=true: The header checkbox will select only the rows on the current page when checked, and un-select only the rows on the current page when unchecked.
