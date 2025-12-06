import React from 'react';
import {
    LayoutDashboard,
    Layers,
    Inbox,
    Server,
    FileText,
    Settings,
    Circle
} from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-50 h-screen border-r border-gray-200 flex flex-col">
            {/* Logo Section */}
            <div className="p-4 flex items-center space-x-2 border-b border-gray-100">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Layers size={20} />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900 text-lg">Vault</h1>
                    <p className="text-xs text-gray-500">Anurag Yadav</p>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-3 space-y-6">
                    {/* Main Nav */}
                    <div className="space-y-1">
                        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                        <NavItem icon={<Layers size={18} />} label="Nexus" />
                        <NavItem icon={<Inbox size={18} />} label="Intake" />
                    </div>

                    {/* Services Section */}
                    <div>
                        <div className="flex items-center justify-between px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer">
                            <span className="text-sm font-medium flex items-center gap-2">
                                <Server size={18} /> Services
                            </span>
                        </div>
                        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                            <NavItem small label="Pre-active" />
                            <NavItem small label="Active" />
                            <NavItem small label="Blocked" />
                            <NavItem small label="Closed" />
                        </div>
                    </div>

                    {/* Invoices Section */}
                    <div>
                        <div className="flex items-center justify-between px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer">
                            <span className="text-sm font-medium flex items-center gap-2">
                                <FileText size={18} /> Invoices
                            </span>
                        </div>
                        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                            <NavItem small label="Proforma Invoices" active />
                            <NavItem small label="Final Invoices" />
                        </div>
                    </div>
                </nav>
            </div>

            {/* Footer / Settings if needed */}
            <div className="p-4 border-t border-gray-100">
                {/* Placeholder for footer items */}
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active, small = false }) => {
    return (
        <a
            href="#"
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${active
                    ? 'bg-gray-200 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
        >
            {icon ? icon : (small && <div className="w-4 h-4 flex items-center justify-center"><Circle size={6} className="text-gray-400" /></div>)}
            <span className={`text-sm ${small ? 'text-xs' : ''}`}>{label}</span>
        </a>
    );
};

export default Sidebar;
