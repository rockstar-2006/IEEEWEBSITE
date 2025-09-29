export interface User {
  id: string;
  ieeeId: string;
  email: string;
  fullName: string;
  branch: string;
  year: string;
  registrations: string[];
  volunteerAssignments: string[];
}

export interface Admin {
  id: string;
  ieeeId: string;
  password: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  society: 'Communication Society' | 'Computer Society' | 'SIGHT' | 'WIE';
  date: string;
  time: string;
  venue: string;
  image: string;
  capacity: number;
  tags: string[];
  participants: string[];
  volunteers: string[];
  isPast: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    email?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  abstract: string;
  downloadLink: string;
}

export interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  login: (ieeeId: string, password: string, isAdmin?: boolean) => boolean;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'registrations' | 'volunteerAssignments'>) => boolean;
  registerForEvent: (eventId: string) => boolean;
  assignVolunteer: (eventId: string, userId: string) => void;
}