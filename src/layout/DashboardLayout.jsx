import { useState, useEffect, useContext } from "react";
import {
    Search, Bell, LayoutDashboard, TicketCheck, CreditCard,
    QrCode, HelpCircle, Settings, LogOut, Menu, X,
    TriangleAlert, Lock, ReceiptText, CheckCircle, ScanLine,
    AlertTriangle, Info, Car, Moon, Sun, ChevronDown,
    Check, Clock, Share2
} from 'lucide-react';
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NotifPanel from "../components/NotifPanel";
import { DarkModeContext } from "../context/DarkModeState";

const notifications = [
    { id: 1, type: 'success', message: "Your ticket for today has been successfully purchased. You're cleared to operate.", unread: true },
    { id: 2, type: 'scan', message: "Your QR code was scanned at Gate B checkpoint at 8:42 AM.", unread: true },
    { id: 3, type: 'warning', message: "Payment failed for yesterday's ticket. Please retry to avoid a penalty.", unread: false },
    { id: 4, type: 'success', message: "Weekly ticket package applied successfully. Valid Mon-Fri.", unread: false },
    { id: 5, type: 'info', message: "Reminder: your ticket expires at midnight. Purchase tomorrow's in advance.", unread: false },
];

const navItems = [
    { label: "Dashboard", Icon: LayoutDashboard, to: "/driver-dashboard" },
    // { label: "Buy Ticket", Icon: TicketCheck },
    { label: "Ticket History", Icon: CreditCard, to: "/driver-dashboard/ticket-history" },
    // { label: "QR Code", Icon: QrCode },
    // { label: "Help Center", Icon: HelpCircle },
    { label: "Settings", Icon: Settings, to: "/driver-dashboard/settings" },
  ];

const unreadCount = notifications.filter(n => n.unread).length;

const notifIcon = (type) => {
    if (type === 'success') return <CheckCircle size={17} className="text-green-500 mt-0.5 shrink-0" />;
    if (type === 'scan') return <ScanLine size={17} className="text-blue-500  mt-0.5 shrink-0" />;
    if (type === 'warning') return <AlertTriangle size={17} className="text-red-500   mt-0.5 shrink-0" />;
    return <Info size={17} className="text-gray-400  mt-0.5 shrink-0" />;
};

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const [activeNav, setActiveNav] = useState("Dashboard");

    const dk = darkMode;
    const sidebar = dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
    const headerCls = dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
    const notifPanel = dk ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100";
    const inputCls = dk
        ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-primary"
        : "bg-gray-50  border-gray-100 text-gray-700 placeholder-gray-400 focus:ring-primary";

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-200 ${dk ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            {/* ── Sidebar ── */}
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeNav={activeNav} setActiveNav={setActiveNav} dk={dk} sidebar={sidebar} navItems={navItems} setDarkMode={setDarkMode} />

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── Main ── */}
            <main className="flex-1 flex flex-col overflow-y-auto lg:ml-64">

                {/* Header */}
                <header className={`sticky top-0 z-30 flex justify-between items-center px-5 py-3 border-b shadow-sm transition-colors duration-200 ${headerCls}`}>
                    <div className="flex items-center gap-3 flex-1 max-w-md">
                        <button className="lg:hidden p-1.5 text-gray-500" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <div className="relative flex-1 hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`w-full border rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors ${inputCls}`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setNotifOpen(true)}
                            className={`relative p-2 rounded-xl border transition-all ${dk
                                ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                                : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 shadow-sm'}`}
                        >
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                            )}
                        </button>

                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-9 h-9 rounded-full bg-primary flex items-center justify-center text-gray-900 font-bold text-sm shrink-0 ring-2 ring-offset-1 transition-all
                                ${dk ? 'ring-primary ring-offset-gray-900' : 'ring-primary/30 ring-offset-white'}`}>
                                MB
                            </div>
                            <div className="hidden md:flex flex-col leading-tight">
                                <span className={`text-sm font-semibold ${dk ? 'text-white' : 'text-header'}`}>Michael Blaq</span>
                                <span className={`text-xs ${dk ? 'text-gray-500' : 'text-body'}`}>Driver</span>
                            </div>
                            {/* <ChevronDown size={15} className={`hidden md:block ${dk ? 'text-gray-500' : 'text-gray-400'}`} /> */}
                        </div>
                    </div>
                </header>

                <Outlet />

            </main>
      
        {/* Notif overlay */}
        {notifOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setNotifOpen(false)} />}
        {/* Notif panel */}
        <NotifPanel notifications={notifications} dk={dk} notifOpen={notifOpen} setNotifOpen={setNotifOpen} notifPanel={notifPanel} unreadCount={unreadCount} notifIcon={notifIcon} />
    </div>
  );
}