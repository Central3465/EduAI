// src/context/AppContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [accessCode, setAccessCode] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      subject: "Computer Science",
      dueDate: "2024-01-15",
      status: "active",
      questions: 5,
      submissions: 12,
      aiGenerated: true,
      grade: "A"
    },
    {
      id: 2,
      title: "Shakespeare Analysis",
      subject: "Literature",
      dueDate: "2024-01-20",
      status: "completed",
      questions: 3,
      submissions: 8,
      aiGenerated: true,
      grade: "B+"
    }
  ]);
  const [students, setStudents] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@email.com", grade: "A", progress: 95 },
    { id: 2, name: "Maria Garcia", email: "maria@email.com", grade: "B+", progress: 87 },
    { id: 3, name: "James Wilson", email: "james@email.com", grade: "A-", progress: 92 }
  ]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    difficulty: 'medium',
    questionCount: 5
  });
  const [tempUserData, setTempUserData] = useState(null);

  // Temporary data store for user accounts
  const userStore = React.useRef(new Map());

  const handleAccessCodeSubmit = useCallback((e) => {
    e.preventDefault();
    if (accessCode === 'TEACHER2024') {
      setTempUserData({ accessCode });
      // Navigate handled by component using useNavigate
    } else {
      alert('Invalid access code. Please try again.');
    }
  }, [accessCode]);

  const handleInvitationCodeSubmit = useCallback((e) => {
    e.preventDefault();
    if (invitationCode && invitationCode.length >= 6) {
      setTempUserData({ invitationCode });
      // Navigate handled by component using useNavigate
    } else {
      alert('Invalid invitation code. Please check your email for the correct code.');
    }
  }, [invitationCode]);

  const handleTeacherRegistration = useCallback((userData) => {
    const userId = Date.now().toString();
    userStore.current.set(userId, {
      id: userId,
      email: userData.email,
      password: userData.password,
      accessCode: tempUserData?.accessCode,
      createdAt: new Date().toISOString(),
      role: 'teacher'
    });

    setUserRole('teacher');
    setCurrentUser({ name: 'Dr. Sarah Chen', email: userData.email });
    // Navigate handled by component using useNavigate
  }, [tempUserData]);

  const handleStudentRegistration = useCallback((userData) => {
    const userId = Date.now().toString();
    userStore.current.set(userId, {
      id: userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      invitationCode: userData.invitationCode,
      createdAt: new Date().toISOString(),
      role: 'student'
    });

    setUserRole('student');
    setCurrentUser({ name: userData.name, email: userData.email });
    // Navigate handled by component using useNavigate
  }, []);

  const logout = useCallback(() => {
    setUserRole(null);
    setCurrentUser(null);
    // Navigate handled by component using useNavigate
  }, []);

  const generateAssignment = useCallback(() => {
    const mockAssignment = {
      id: assignments.length + 1,
      title: newAssignment.title || `AI Assignment ${assignments.length + 1}`,
      subject: newAssignment.subject || 'General',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      questions: newAssignment.questionCount,
      submissions: 0,
      aiGenerated: true
    };
    setAssignments(prev => [...prev, mockAssignment]);
    setNewAssignment({ title: '', subject: '', difficulty: 'medium', questionCount: 5 });
  }, [assignments.length, newAssignment]);

  return (
    <AppContext.Provider value={{
      accessCode, setAccessCode,
      invitationCode, setInvitationCode,
      userRole, setUserRole,
      currentUser, setCurrentUser,
      assignments, setAssignments,
      students, setStudents,
      newAssignment, setNewAssignment,
      generateAssignment,
      tempUserData, setTempUserData,
      handleAccessCodeSubmit,
      handleInvitationCodeSubmit,
      handleTeacherRegistration,
      handleStudentRegistration,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};