import {Sun, Moon, Car, X, LogOut} from 'lucide-react';
import NavItem from './NavItem';
import KowopeDashboardLogo from '../assets/kowopeDashboardLogo-removebg-preview.png';

export default function SideBar({ sidebarOpen, setSidebarOpen, activeNav, sidebar, navItems, setActiveNav, dk, setDarkMode }) {
    return (
        <div className={`fixed top-0 left-0 z-50 w-64 h-screen border-r flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 ${sidebar}`}>

            <div className={`p-5 flex items-center justify-between border-b ${dk ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2">
                    {/* <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center shrink-0">
                        <Car size={15} className="text-gray-900" />
                    </div>
                    <span className={`text-base font-bold tracking-tight ${dk ? 'text-white' : 'text-gray-900'}`}>DriverPass</span> */}
                    <img
                        src={KowopeDashboardLogo} 
                        alt="Kowope Logo" 
                        className="w-28 h-8 object-contain" 
                    />
                </div>
                <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
            {navItems.map(({ label, Icon, to }) => (
                <NavItem 
                    key={label} 
                    Icon={Icon} 
                    label={label} 
                    to={to} 
                    setActiveNav={setActiveNav} 
                    setSidebarOpen={setSidebarOpen} 
                    activeNav={activeNav} 
                    dk={dk} />
            ))}
            </div>

            {/* Help box */}
            <div className={`mx-3 mb-3 p-4 rounded-2xl text-center ${dk ? 'bg-gray-800' : 'bg-orange-50'}`}>
                <p className={`text-xs font-semibold mb-0.5 ${dk ? 'text-gray-200' : 'text-gray-700'}`}>Need Help</p>
                <p className={`text-xs mb-3 ${dk ? 'text-gray-500' : 'text-gray-400'}`}>You can contact us</p>
                <button className="bg-primary hover:bg-primary-hover text-gray-900 text-xs font-bold px-4 py-1.5 rounded-lg w-full transition-colors">
                    GET SUPPORT
                </button>
            </div>

            <div className={`p-3 border-t space-y-0.5 ${dk ? 'border-gray-800' : 'border-gray-100'}`}>
            {/* Dark mode toggle */}
                <button
                    onClick={() => setDarkMode(d => !d)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${dk
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        {dk ? <Sun size={18} /> : <Moon size={18} />}
                        <span>{dk ? 'Light Mode' : 'Dark Mode'}</span>
                    </div>
                    <div className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${dk ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${dk ? 'left-4' : 'left-0.5'}`} />
                    </div>
                </button>

                {/* Logout */}
                <button className={`flex items-center w-full px-4 py-2.5 rounded-xl text-sm font-medium gap-3 transition-all
                    ${dk ? 'text-gray-400 hover:bg-gray-800 hover:text-red-400' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`}>
                    <LogOut size={18} />
                    Log out
                </button>
            </div>
        </div>
    )
}