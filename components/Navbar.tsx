type NavbarProps = {
  email: string;
};

export default function Navbar({ email }: NavbarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{email}</span>
      </div>
    </div>
  );
}
