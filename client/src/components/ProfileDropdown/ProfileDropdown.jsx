import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';

const ProfileDropdown = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Listen for Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) return null; // Hide if not logged in

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Icon / Avatar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-100 hover:border-green-500 transition-all overflow-hidden focus:outline-none"
            >
                {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                    <div className="bg-green-100 text-green-700 w-full h-full flex items-center justify-center font-bold">
                        {user.displayName?.charAt(0) || 'U'}
                    </div>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <User className="w-4 h-4 mr-3 text-gray-400" /> Dashboard
                        </button>
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <Settings className="w-4 h-4 mr-3 text-gray-400" /> Settings
                        </button>
                    </div>

                    <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-3" /> Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;