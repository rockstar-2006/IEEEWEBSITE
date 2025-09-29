import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, Admin } from '../types';
import usersData from '../data/users.json';
import adminData from '../data/admin.json';
import eventsData from '../data/events.json';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);
  const [events, setEvents] = useState(eventsData);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ieee_user');
    const savedAdmin = localStorage.getItem('ieee_admin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = (ieeeId: string, password: string, isAdmin = false): boolean => {
    if (isAdmin) {
      const adminUser = adminData.find(a => a.ieeeId === ieeeId && a.password === password);
      if (adminUser) {
        setAdmin(adminUser);
        localStorage.setItem('ieee_admin', JSON.stringify(adminUser));
        return true;
      }
    } else {
      // For students, we'll use IEEE ID as password for demo purposes
      const studentUser = users.find(u => u.ieeeId === ieeeId);
      if (studentUser) {
        setUser(studentUser);
        localStorage.setItem('ieee_user', JSON.stringify(studentUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem('ieee_user');
    localStorage.removeItem('ieee_admin');
  };

  const signup = (userData: Omit<User, 'id' | 'registrations' | 'volunteerAssignments'>): boolean => {
    const newUser: User = {
      ...userData,
      id: `u${Date.now()}`,
      registrations: [],
      volunteerAssignments: []
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem('ieee_user', JSON.stringify(newUser));
    return true;
  };

  const registerForEvent = (eventId: string): boolean => {
    if (!user) return false;
    
    if (user.registrations.includes(eventId)) return false;
    
    const updatedUser = {
      ...user,
      registrations: [...user.registrations, eventId]
    };
    
    setUser(updatedUser);
    localStorage.setItem('ieee_user', JSON.stringify(updatedUser));
    
    // Update users list
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    
    return true;
  };

  const assignVolunteer = (eventId: string, userId: string) => {
    // Update the user's volunteer assignments
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, volunteerAssignments: [...u.volunteerAssignments, eventId] }
        : u
    );
    setUsers(updatedUsers);
  };

  return (
    <AuthContext.Provider value={{
      user,
      admin,
      login,
      logout,
      signup,
      registerForEvent,
      assignVolunteer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};