import { Navbar } from '@/widgets/Navbar';

export function ProfilePage() {
  return (
    <div className="w-full min-h-screen grid grid-cols-[23%_1fr_27%] overflow-y-auto">
      <Navbar isOpen={true} />
      <div className="border border-red-500 h-full">content</div>
      <div className="border border-red-500 h-full">searchbar</div>
    </div>
  );
}

export default ProfilePage;
