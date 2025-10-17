// src/context/AppContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const AppContext = createContext();
const SubscriptionContext = createContext();
const NotificationContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // State management
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") || null
  );
  const [invitationCode, setInvitationCode] = useState(
    () => localStorage.getItem("invitationCode") || ""
  );
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : { teachers: [], students: [] };
  });
  const [authLoading, setAuthLoading] = useState(false);

  const [accessCode, setAccessCode] = useState(
    () => localStorage.getItem("accessCode") || ""
  );

  // Save to localStorage
  React.useEffect(() => {
    if (invitationCode) localStorage.setItem("invitationCode", invitationCode);
    else localStorage.removeItem("invitationCode");
  }, [invitationCode]);

  useEffect(() => {
    if (userRole) localStorage.setItem("userRole", userRole);
    else localStorage.removeItem("userRole");
  }, [userRole]);

  useEffect(() => {
    if (currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("currentUser");
  }, [currentUser]);

  React.useEffect(() => {
    if (accessCode) localStorage.setItem("accessCode", accessCode);
    else localStorage.removeItem("accessCode");
  }, [accessCode]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const generateVerificationCode = useCallback(() => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  }, []);

  const [verificationCodes, setVerificationCodes] = useState(() => {
    const saved = localStorage.getItem("verificationCodes");
    return saved
      ? JSON.parse(saved)
      : {
          teachers: {},
          students: {},
        };
  });

  const sendVerificationEmail = useCallback(async (email, code, role) => {
    console.log(
      `📧 Verification email sent to ${email} for ${role} with code: ${code}`
    );

    // In a real app, you'd call your backend API here
    // For now, we'll simulate it
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  }, []);

  // handleStudentRegistration moved/removed to avoid duplicate declaration; implementation exists later in this file.

  // src/context/AppContext.jsx
const handleTeacherRegistration = useCallback((userData) => {
  setAuthLoading(true);

  try {
    // Check if email already exists
    const existingTeacher = users.teachers.find(t => t.email === userData.email);
    const existingStudent = users.students.find(s => s.email === userData.email);
    
    if (existingTeacher || existingStudent) {
      throw new Error('Email already registered');
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const newTeacher = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      accessCode: userData.accessCode || 'TEACHER2024',
      createdAt: new Date().toISOString(),
      role: 'teacher',
      verified: false, // ✅ NOT YET VERIFIED
      name: userData.name || 'Teacher',
      verificationCode: verificationCode, // ✅ Store code
      verificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    setUsers(prev => ({
      ...prev,
      teachers: [...prev.teachers, newTeacher]
    }));

    // ✅ Store verification code in localStorage (instead of sending email)
    localStorage.setItem(`verification_${userData.email}`, JSON.stringify({
      code: verificationCode,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      role: 'teacher'
    }));

    setAuthLoading(false);
    return { 
      success: true, 
      message: `Registration successful! Your verification code is: ${verificationCode}. Please save this code for login.` 
    };
  } catch (error) {
    setAuthLoading(false);
    return { success: false, message: error.message };
  }
}, [users, generateVerificationCode]);

const handleStudentRegistration = useCallback((userData) => {
  setAuthLoading(true);

  try {
    // Check if email already exists
    const existingTeacher = users.teachers.find(t => t.email === userData.email);
    const existingStudent = users.students.find(s => s.email === userData.email);
    
    if (existingTeacher || existingStudent) {
      throw new Error('Email already registered');
    }

    // Verify invitation code
    if (userData.invitationCode !== 'STUDENT2024') {
      throw new Error('Invalid invitation code');
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const newStudent = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      invitationCode: userData.invitationCode,
      createdAt: new Date().toISOString(),
      role: 'student',
      verified: false, // ✅ NOT YET VERIFIED
      grade: 'A',
      verificationCode: verificationCode, // ✅ Store code
      verificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    setUsers(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));

    // ✅ Store verification code in localStorage (instead of sending email)
    localStorage.setItem(`verification_${userData.email}`, JSON.stringify({
      code: verificationCode,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      role: 'student'
    }));

    setAuthLoading(false);
    return { 
      success: true, 
      message: `Registration successful! Your verification code is: ${verificationCode}. Please save this code for login.` 
    };
  } catch (error) {
    setAuthLoading(false);
    return { success: false, message: error.message };
  }
}, [users, generateVerificationCode]);

  // Save to localStorage
  React.useEffect(() => {
    localStorage.setItem(
      "verificationCodes",
      JSON.stringify(verificationCodes)
    );
  }, [verificationCodes]);

  // Add verifyEmailWithCode function
  const verifyEmailWithCode = useCallback(
    (email, code, role) => {
      try {
        // Check if code exists and is valid
        const verification =
          verificationCodes[role === "teacher" ? "teachers" : "students"]?.[
            email
          ];

        if (!verification) {
          throw new Error("Verification code not found");
        }

        if (verification.code !== code) {
          throw new Error("Invalid verification code");
        }

        if (new Date() > new Date(verification.expiry)) {
          throw new Error("Verification code has expired");
        }

        // Update user to verified
        setUsers((prev) => {
          if (role === "teacher") {
            return {
              ...prev,
              teachers: prev.teachers.map((t) =>
                t.email === email ? { ...t, verified: true } : t
              ),
            };
          } else {
            return {
              ...prev,
              students: prev.students.map((s) =>
                s.email === email ? { ...s, verified: true } : s
              ),
            };
          }
        });

        // Remove verification code
        setVerificationCodes((prev) => {
          const newCodes = { ...prev };
          if (role === "teacher") {
            delete newCodes.teachers[email];
          } else {
            delete newCodes.students[email];
          }
          return newCodes;
        });

        return { success: true, message: "Email verified successfully!" };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    [verificationCodes]
  );

  const handleTeacherLogin = useCallback(
    (email, password) => {
      setAuthLoading(true);

      try {
        const teacher = users.teachers.find((t) => t.email === email);

        if (!teacher) {
          throw new Error("No account found with this email");
        }

        if (teacher.password !== password) {
          throw new Error("Incorrect password");
        }

        if (!teacher.verified) {
          throw new Error("Please verify your email before logging in");
        }

        setUserRole("teacher");
        setCurrentUser({ name: teacher.name, email: teacher.email });

        setAuthLoading(false);
        return { success: true, message: "Login successful!" };
      } catch (error) {
        setAuthLoading(false);
        return { success: false, message: error.message };
      }
    },
    [users]
  );

  // Update handleStudentLogin
  const handleStudentLogin = useCallback(
    (email, password) => {
      setAuthLoading(true);

      try {
        const student = users.students.find((s) => s.email === email);

        if (!student) {
          throw new Error("No account found with this email");
        }

        if (student.password !== password) {
          throw new Error("Incorrect password");
        }

        if (!student.verified) {
          throw new Error("Please verify your email before logging in");
        }

        setUserRole("student");
        setCurrentUser({ name: student.name, email: student.email });

        setAuthLoading(false);
        return { success: true, message: "Login successful!" };
      } catch (error) {
        setAuthLoading(false);
        return { success: false, message: error.message };
      }
    },
    [users]
  );

  // Logout
  const logout = useCallback(() => {
    console.log("=== 🔚 LOGOUT ===");
    setUserRole(null);
    setCurrentUser(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
  }, []);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        users,
        authLoading,
        handleStudentRegistration,
        handleTeacherRegistration,
        handleStudentLogin,
        handleTeacherLogin,
        invitationCode,
        setInvitationCode,
        logout,
        verificationCodes,
        generateVerificationCode,
        sendVerificationEmail,
        verifyEmailWithCode,
        accessCode,
        setAccessCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
