import { Link } from "react-router-dom";
import { Icon } from "lucide-react";

export default function NavItem({ Icon, label, to, setActiveNav, setSidebarOpen, activeNav, dk }) {
    
    
    return (
        <Link
            key={label}
            onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
            className={`flex items-center w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all gap-3
            ${activeNav === label
                ? 'bg-primary text-gray-900'
                : dk
                ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                : 'text-[#0F1729] hover:bg-gray-100 hover:text-gray-800'
            }`}
            to={to}
        >
            <Icon size={18} />
            {label}
        </Link>
    );
}