type Props = {
  email: string;
  onLogout: () => void;
};

export default function Navbar({ email, onLogout }: Props) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-primary">
        VaultMark
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{email}</span>
        <button
          onClick={onLogout}
          className="text-red-500 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
