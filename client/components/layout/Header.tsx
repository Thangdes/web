import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-between items-center px-10 py-6 bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-[#f3e8ff] w-6 h-6 flex items-center justify-center">
            <span className="block w-3 h-3 bg-[#7c3aed] rounded-full"></span>
          </span>
          <span className="text-2xl font-bold text-gray-900">Tempra</span>
        </span>
      </div>
      <nav className="flex gap-6 text-base">
        <span className="cursor-pointer">Product <span className="text-xs">▼</span></span>
        <span className="cursor-pointer">Teams <span className="text-xs">▼</span></span>
        <span className="cursor-pointer">Resources <span className="text-xs">▼</span></span>
        <span className="cursor-pointer">Pricing</span>
        <span className="cursor-pointer">Enterprise</span>
      </nav>
      <div className="flex items-center gap-6">
        <span className="text-gray-500 cursor-pointer">Contact Sales</span>
        <span className="text-gray-500 cursor-pointer">Log In</span>
        <Button variant="default" size="lg" className="rounded-full px-6 py-2 bg-gray-900 text-white hover:bg-gray-800">
          Get Started
        </Button>
      </div>
    </header>
  );
};