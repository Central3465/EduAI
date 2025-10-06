// src/context/AppContext.jsx
import React, { createContext, useState, useContext, useCallback, useRef } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Load initial state from localStorage
  const [accessCode, setAccessCode] = useState(() => localStorage.getItem('accessCode') || '');
  const [invitationCode, setInvitationCode] = useState(() => localStorage.getItem('invitationCode') || '');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);
  const [newAssignment, setNewAssignment] = useState(null);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  // Store registered users
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : {
      teachers: [],
      students: []
    };
  });

  // Verification codes storage
  const [verificationCodes, setVerificationCodes] = useState(() => {
    const saved = localStorage.getItem('verificationCodes');
    return saved ? JSON.parse(saved) : {
      teachers: {},
      students: {}
    };
  });

  const [authLoading, setAuthLoading] = useState(false);

  // Save to localStorage whenever state changes
  React.useEffect(() => {
    if (accessCode) localStorage.setItem('accessCode', accessCode);
    else localStorage.removeItem('accessCode');
  }, [accessCode]);

  React.useEffect(() => {
    if (invitationCode) localStorage.setItem('invitationCode', invitationCode);
    else localStorage.removeItem('invitationCode');
  }, [invitationCode]);

  React.useEffect(() => {
    if (userRole) localStorage.setItem('userRole', userRole);
    else localStorage.removeItem('userRole');
  }, [userRole]);

  React.useEffect(() => {
    if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('currentUser');
  }, [currentUser]);

  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  React.useEffect(() => {
    localStorage.setItem('verificationCodes', JSON.stringify(verificationCodes));
  }, [verificationCodes]);

  // Generate verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  };

  // Send verification email (mock implementation)
  const sendVerificationEmail = useCallback(async (email, code, role) => {
    console.log(`Verification email sent to ${email} for ${role} with code: ${code}`);
    return new Promise(resolve => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  }, []);

  // CORRECTED: Handle teacher registration
  const handleTeacherRegistration = useCallback((userData) => {
    setAuthLoading(true);
    
    try {
      // Check if email already exists in either teachers or students
      const existingTeacher = users.teachers.find(t => t.email === userData.email);
      const existingStudent = users.students.find(s => s.email === userData.email);
      
      if (existingTeacher || existingStudent) {
        throw new Error('Email already registered');
      }

      const verificationCode = generateVerificationCode();
      const newTeacher = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password,
        accessCode: userData.accessCode || 'TEACHER2024',
        createdAt: new Date().toISOString(),
        role: 'teacher', // ✅ SET CORRECT ROLE
        verified: false,
        name: userData.name || 'Teacher',
        verificationCode: verificationCode,
        verificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      setUsers(prev => ({
        ...prev,
        teachers: [...prev.teachers, newTeacher] // ✅ STORE IN TEACHERS ARRAY
      }));

      // Send verification email
      sendVerificationEmail(newTeacher.email, verificationCode, 'teacher');

      setAuthLoading(false);
      return { 
        success: true, 
        message: 'Registration successful! Please check your email to verify your account.' 
      };
    } catch (error) {
      setAuthLoading(false);
      return { success: false, message: error.message };
    }
  }, [users, sendVerificationEmail, generateVerificationCode]);

  // CORRECTED: Handle student registration
  const handleStudentRegistration = useCallback((userData) => {
    setAuthLoading(true);
    
    try {
      // Check if email already exists in either teachers or students
      const existingTeacher = users.teachers.find(t => t.email === userData.email);
      const existingStudent = users.students.find(s => s.email === userData.email);
      
      if (existingTeacher || existingStudent) {
        throw new Error('Email already registered');
      }

      // Verify invitation code (mock verification)
      if (userData.invitationCode !== 'STUDENT2024') {
        throw new Error('Invalid invitation code');
      }

      const verificationCode = generateVerificationCode();
      const newStudent = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        invitationCode: userData.invitationCode,
        createdAt: new Date().toISOString(),
        role: 'student', // ✅ SET CORRECT ROLE
        verified: false,
        grade: 'A',
        verificationCode: verificationCode,
        verificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      setUsers(prev => ({
        ...prev,
        students: [...prev.students, newStudent] // ✅ STORE IN STUDENTS ARRAY
      }));

      // Send verification email
      sendVerificationEmail(newStudent.email, verificationCode, 'student');

      setAuthLoading(false);
      return { 
        success: true, 
        message: 'Registration successful! Please check your email to verify your account.' 
      };
    } catch (error) {
      setAuthLoading(false);
      return { success: false, message: error.message };
    }
  }, [users, sendVerificationEmail, generateVerificationCode]);

  // Handle teacher login
  const handleTeacherLogin = useCallback((email, password) => {
    setAuthLoading(true);
    
    try {
      const teacher = users.teachers.find(t => t.email === email);
      
      if (!teacher) {
        throw new Error('No account found with this email');
      }
      
      if (teacher.password !== password) {
        throw new Error('Incorrect password');
      }
      
      if (!teacher.verified) {
        throw new Error('Please verify your email before logging in');
      }

      // ✅ SET CORRECT ROLE FOR TEACHER
      setUserRole('teacher');
      setCurrentUser({ name: teacher.name, email: teacher.email });
      
      setAuthLoading(false);
      return { success: true, message: 'Login successful!' };
    } catch (error) {
      setAuthLoading(false);
      return { success: false, message: error.message };
    }
  }, [users]);

  // Handle student login
  const handleStudentLogin = useCallback((email, password) => {
    setAuthLoading(true);
    
    try {
      const student = users.students.find(s => s.email === email);
      
      if (!student) {
        throw new Error('No account found with this email');
      }
      
      if (student.password !== password) {
        throw new Error('Incorrect password');
      }
      
      if (!student.verified) {
        throw new Error('Please verify your email before logging in');
      }

      // ✅ SET CORRECT ROLE FOR STUDENT
      setUserRole('student');
      setCurrentUser({ name: student.name, email: student.email });
      
      setAuthLoading(false);
      return { success: true, message: 'Login successful!' };
    } catch (error) {
      setAuthLoading(false);
      return { success: false, message: error.message };
    }
  }, [users]);

  // Verify email with code
  const verifyEmailWithCode = useCallback((email, code, role) => {
    try {
      if (role === 'teacher') {
        const teacherIndex = users.teachers.findIndex(t => t.email === email);
        if (teacherIndex === -1) {
          throw new Error('Account not found');
        }

        const teacher = users.teachers[teacherIndex];
        
        if (teacher.verificationCode !== code) {
          throw new Error('Invalid verification code');
        }
        
        if (new Date() > new Date(teacher.verificationExpiry)) {
          throw new Error('Verification code has expired');
        }

        setUsers(prev => ({
          ...prev,
          teachers: prev.teachers.map((t, index) => 
            index === teacherIndex 
              ? { ...t, verified: true, verificationCode: null, verificationExpiry: null } 
              : t
          )
        }));

        return { success: true, message: 'Email verified successfully!' };
      } else { // student
        const studentIndex = users.students.findIndex(s => s.email === email);
        if (studentIndex === -1) {
          throw new Error('Account not found');
        }

        const student = users.students[studentIndex];
        
        if (student.verificationCode !== code) {
          throw new Error('Invalid verification code');
        }
        
        if (new Date() > new Date(student.verificationExpiry)) {
          throw new Error('Verification code has expired');
        }

        setUsers(prev => ({
          ...prev,
          students: prev.students.map((s, index) => 
            index === studentIndex 
              ? { ...s, verified: true, verificationCode: null, verificationExpiry: null } 
              : s
          )
        }));

        return { success: true, message: 'Email verified successfully!' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }, [users]);

  // Logout function
  const logout = useCallback(() => {
    setUserRole(null);
    setCurrentUser(null);
  }, []);

  return (
    <AppContext.Provider value={{
      accessCode,
      setAccessCode,
      invitationCode,
      setInvitationCode,
      userRole,
      setUserRole,
      currentUser,
      setCurrentUser,
      users,
      authLoading,
      setAssignments,
      setStudents,
      newAssignment,
      setNewAssignment,
      handleTeacherRegistration,
      handleStudentRegistration,
      handleTeacherLogin,
      handleStudentLogin,
      verifyEmailWithCode,
      assignments,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};