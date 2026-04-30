import { X } from "lucide-react";

export default function NotifPanel({ notifications, dk, notifOpen, setNotifOpen, notifPanel, unreadCount, notifIcon }) {
    return (
        <aside className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm flex flex-col shadow-2xl border-l transform transition-transform duration-300
            ${notifOpen ? 'translate-x-0' : 'translate-x-full'} sm:rounded-l-2xl ${notifPanel} ${dk ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className={`px-5 py-4 flex items-center justify-between border-b ${dk ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2">
                    <h2 className={`text-base font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>Notifications</h2>
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{unreadCount}</span>
                    )}
                </div>
                <button
                    onClick={() => setNotifOpen(false)}
                    className={`p-1.5 rounded-lg transition-colors ${dk ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}
                >
                    <X size={16} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {notifications.map(n => (
                <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl transition-colors
                    ${n.unread
                    ? dk ? 'bg-gray-800' : 'bg-yellow-50 border border-yellow-100'
                    : dk ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                >
                    {notifIcon(n.type)}
                    <p className={`text-xs leading-relaxed ${dk ? 'text-gray-300' : 'text-gray-600'}`}>{n.message}</p>
                </div>
                ))}
            </div>
        </aside>
    )
}