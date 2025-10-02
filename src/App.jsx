import { useState, useCallback, useRef } from 'react';
// ✅ Import page components
import LandingPage from './pages/LandingPage';
import TeacherLoginPage from './pages/TeacherLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import RequestAccessPage from './pages/RequestAccessPage';
import TeacherRegistrationPage from './pages/TeacherRegistrationPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
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
  const userStore = useRef(new Map());

  // stable submit handler (keeps identity between renders when deps unchanged)
  const handleAccessCodeSubmit = useCallback((e) => {
    e.preventDefault();
    if (accessCode === 'TEACHER2024') {
      setTempUserData({ accessCode });
      setCurrentView('teacher-registration');
    } else {
      alert('Invalid access code. Please try again.');
    }
  }, [accessCode]);

  const handleInvitationCodeSubmit = useCallback((e) => {
    e.preventDefault();
    // Simulate checking if invitation code is valid
    if (invitationCode && invitationCode.length >= 6) {
      setTempUserData({ invitationCode });
      setCurrentView('student-registration');
    } else {
      alert('Invalid invitation code. Please check your email for the correct code.');
    }
  }, [invitationCode]);

  const handleTeacherRegistration = useCallback((userData) => {
    // Save to temporary data store
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
    setCurrentView('dashboard');
  }, [tempUserData]);

  const handleStudentRegistration = useCallback((userData) => {
    // Save to temporary data store
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
    setCurrentView('dashboard');
  }, []);

  const logout = useCallback(() => {
    setUserRole(null);
    setCurrentUser(null);
    setCurrentView('landing');
  }, []);

  // stable generator (recomputes only when assignments/newAssignment change)
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
  }, [assignments.length, newAssignment, setAssignments, setNewAssignment]);

  // choose view
  if (currentView === 'landing') return <LandingPage setCurrentView={setCurrentView} />;
  if (currentView === 'teacher-login') return (
    <TeacherLoginPage
      setCurrentView={setCurrentView}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      handleAccessCodeSubmit={handleAccessCodeSubmit}
    />
  );
  if (currentView === 'student-login') return (
    <StudentLoginPage
      setCurrentView={setCurrentView}
      invitationCode={invitationCode}
      setInvitationCode={setInvitationCode}
      handleInvitationCodeSubmit={handleInvitationCodeSubmit}
    />
  );
  if (currentView === 'request-access') return <RequestAccessPage setCurrentView={setCurrentView} />;
  if (currentView === 'teacher-registration') return (
    <TeacherRegistrationPage 
      setCurrentView={setCurrentView} 
      onRegister={handleTeacherRegistration} 
    />
  );
  if (currentView === 'student-registration') return (
    <StudentRegistrationPage 
      setCurrentView={setCurrentView} 
      onRegister={handleStudentRegistration}
      invitationCode={invitationCode}
    />
  );
  if (currentView === 'dashboard') return (
    <Dashboard
      assignments={assignments}
      students={students}
      newAssignment={newAssignment}
      setNewAssignment={setNewAssignment}
      generateAssignment={generateAssignment}
      setAssignments={setAssignments}
      setStudents={setStudents}
      userRole={userRole}
      currentUser={currentUser}
      logout={logout}
    />
  );

  return <LandingPage setCurrentView={setCurrentView} />;
};

export default App;