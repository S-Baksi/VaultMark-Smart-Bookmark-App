import "./globals.css";

export const metadata = {
  title: "VaultMark",
  description: "Secure Smart Bookmark Vault",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
