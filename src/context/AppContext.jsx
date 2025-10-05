// src/context/AppContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";

const AppContext = createContext();
import { NotificationProvider } from './NotificationContext';

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Load initial state from localStorage
  const [accessCode, setAccessCode] = useState(() => {
    return localStorage.getItem("accessCode") || "";
  });
  const [invitationCode, setInvitationCode] = useState(() => {
    return localStorage.getItem("invitationCode") || "";
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null; // Load role
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null; // Load user
  });
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
      grade: "A",
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
      grade: "B+",
    },
  ]);
  React.useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@email.com",
      grade: "A",
      progress: 95,
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@email.com",
      grade: "B+",
      progress: 87,
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james@email.com",
      grade: "A-",
      progress: 92,
    },
  ]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    difficulty: "medium",
    questionCount: 5,
  });
  const [tempUserData, setTempUserData] = useState(null);

  // Save to localStorage whenever state changes
  React.useEffect(() => {
    if (accessCode) localStorage.setItem("accessCode", accessCode);
  }, [accessCode]);

  React.useEffect(() => {
    if (invitationCode) localStorage.setItem("invitationCode", invitationCode);
  }, [invitationCode]);

  React.useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole"); // Clear if null
    }
  }, [userRole]);

  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser"); // Clear if null
    }
  }, [currentUser]);

  // Temporary data store for user accounts
  const userStore = React.useRef(new Map());

  const handleAccessCodeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (accessCode === "TEACHER2024") {
        setTempUserData({ accessCode });
        // Navigate handled by component using useNavigate
      } else {
        alert("Invalid access code. Please try again.");
      }
    },
    [accessCode]
  );

  const handleInvitationCodeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (invitationCode && invitationCode.length >= 6) {
        setTempUserData({ invitationCode });
        // Navigate handled by component using useNavigate
      } else {
        alert(
          "Invalid invitation code. Please check your email for the correct code."
        );
      }
    },
    [invitationCode]
  );

  const handleTeacherRegistration = useCallback(
    (userData) => {
      const userId = Date.now().toString();
      userStore.current.set(userId, {
        id: userId,
        email: userData.email,
        password: userData.password,
        accessCode: tempUserData?.accessCode,
        createdAt: new Date().toISOString(),
        role: "teacher",
      });

      // set role and user (this will now persist to localStorage)
      setUserRole("teacher");
      setCurrentUser({ name: "Dr. Sarah Chen", email: userData.email });
      // Navigation handled by component
    },
    [tempUserData]
  );

  const handleStudentRegistration = useCallback((userData) => {
    const userId = Date.now().toString();
    userStore.current.set(userId, {
      id: userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      invitationCode: userData.invitationCode,
      createdAt: new Date().toISOString(),
      role: "student",
    });

    setUserRole("student");
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
      subject: newAssignment.subject || "General",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "active",
      questions: newAssignment.questionCount,
      submissions: 0,
      aiGenerated: true,
    };
    setAssignments((prev) => [...prev, mockAssignment]);
    setNewAssignment({
      title: "",
      subject: "",
      difficulty: "medium",
      questionCount: 5,
    });
  }, [assignments.length, newAssignment]);

  return (
    <NotificationProvider>
    <AppContext.Provider
      value={{
        accessCode,
        setAccessCode,
        invitationCode,
        setInvitationCode,
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        assignments,
        setAssignments,
        students,
        setStudents,
        newAssignment,
        setNewAssignment,
        generateAssignment,
        tempUserData,
        setTempUserData,
        handleAccessCodeSubmit,
        handleInvitationCodeSubmit,
        handleTeacherRegistration,
        handleStudentRegistration,
        logout,
        userRole,
      }}
    >
      {children}
    </AppContext.Provider>
    </NotificationProvider>
  );
};
