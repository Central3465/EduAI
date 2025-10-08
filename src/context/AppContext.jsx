// src/context/AppContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const AppContext = createContext();

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

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 💣 NUKE: Fresh Student Registration
  const handleStudentRegistration = useCallback(
    (userData) => {
      console.log("=== 💣 NUKE: STUDENT REGISTRATION STARTED ===");
      console.log("Input data:", userData);
      setAuthLoading(true);

      try {
        // Check existing users
        const existingTeacher = users.teachers.find(
          (t) => t.email === userData.email
        );
        const existingStudent = users.students.find(
          (s) => s.email === userData.email
        );

        if (existingTeacher || existingStudent) {
          throw new Error("Email already registered");
        }

        // Verify invitation code
        if (userData.invitationCode !== "STUDENT2024") {
          throw new Error("Invalid invitation code");
        }

        // Create student account - NO VERIFICATION
        const newStudent = {
          id: `stu_${Date.now()}`,
          name: userData.name,
          email: userData.email,
          password: userData.password, // In real app, hash this
          role: "student",
          verified: true, // ✅ ALWAYS VERIFIED
          grade: "A",
          createdAt: new Date().toISOString(),
          progress: 0,
          assignmentsCompleted: 0,
        };

        console.log("=== 🎓 CREATING STUDENT ===");
        console.log("Student data:", newStudent);

        // Update users
        setUsers((prev) => ({
          ...prev,
          students: [...prev.students, newStudent],
        }));

        // ✅ FORCE SET USER ROLE TO STUDENT
        console.log("=== 🔑 SETTING USER ROLE TO STUDENT ===");
        localStorage.setItem("userRole", "student");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: newStudent.name,
            email: newStudent.email,
          })
        );

        setUserRole("student");
        setCurrentUser({ name: newStudent.name, email: newStudent.email });

        setAuthLoading(false);
        console.log("=== ✅ STUDENT REGISTRATION COMPLETE ===");

        return {
          success: true,
          message: "🎉 Registration successful! Welcome to EduAI!",
        };
      } catch (error) {
        setAuthLoading(false);
        console.log("=== ❌ STUDENT REGISTRATION FAILED ===");
        console.log("Error:", error.message);
        return { success: false, message: error.message };
      }
    },
    [users]
  );

  // 💣 NUKE: Fresh Teacher Registration
  const handleTeacherRegistration = useCallback(
    (userData) => {
      console.log("=== 💣 NUKE: TEACHER REGISTRATION STARTED ===");
      console.log("Input data:", userData);
      setAuthLoading(true);

      try {
        // Check existing users
        const existingTeacher = users.teachers.find(
          (t) => t.email === userData.email
        );
        const existingStudent = users.students.find(
          (s) => s.email === userData.email
        );

        if (existingTeacher || existingStudent) {
          throw new Error("Email already registered");
        }

        // Create teacher account - NO VERIFICATION
        const newTeacher = {
          id: `tch_${Date.now()}`,
          name: userData.name || "Teacher",
          email: userData.email,
          password: userData.password, // In real app, hash this
          role: "teacher",
          verified: true, // ✅ ALWAYS VERIFIED
          accessCode: userData.accessCode || "TEACHER2024",
          createdAt: new Date().toISOString(),
          students: [],
        };

        console.log("=== 👨‍🏫 CREATING TEACHER ===");
        console.log("Teacher data:", newTeacher);

        // Update users
        setUsers((prev) => ({
          ...prev,
          teachers: [...prev.teachers, newTeacher],
        }));

        // ✅ FORCE SET USER ROLE TO TEACHER
        console.log("=== 🔑 SETTING USER ROLE TO TEACHER ===");
        localStorage.setItem("userRole", "teacher");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: newTeacher.name,
            email: newTeacher.email,
          })
        );

        setUserRole("teacher");
        setCurrentUser({ name: newTeacher.name, email: newTeacher.email });

        setAuthLoading(false);
        console.log("=== ✅ TEACHER REGISTRATION COMPLETE ===");

        return {
          success: true,
          message: "🎉 Registration successful! Welcome to EduAI!",
        };
      } catch (error) {
        setAuthLoading(false);
        console.log("=== ❌ TEACHER REGISTRATION FAILED ===");
        console.log("Error:", error.message);
        return { success: false, message: error.message };
      }
    },
    [users]
  );

  // 💣 NUKE: Student Login
  const handleStudentLogin = useCallback(
    (email, password) => {
      console.log("=== 💣 NUKE: STUDENT LOGIN ===");
      setAuthLoading(true);

      try {
        const student = users.students.find((s) => s.email === email);

        if (!student) {
          throw new Error("No account found with this email");
        }

        if (student.password !== password) {
          throw new Error("Incorrect password");
        }

        // ✅ FORCE SET USER ROLE TO STUDENT
        console.log("=== 🔑 LOGGING IN AS STUDENT ===");
        localStorage.setItem("userRole", "student");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: student.name,
            email: student.email,
          })
        );

        setUserRole("student");
        setCurrentUser({ name: student.name, email: student.email });

        setAuthLoading(false);
        console.log("=== ✅ STUDENT LOGIN SUCCESSFUL ===");
        return { success: true, message: "Login successful!" };
      } catch (error) {
        setAuthLoading(false);
        console.log("=== ❌ STUDENT LOGIN FAILED ===");
        return { success: false, message: error.message };
      }
    },
    [users]
  );

  // 💣 NUKE: Teacher Login
  const handleTeacherLogin = useCallback(
    (email, password) => {
      console.log("=== 💣 NUKE: TEACHER LOGIN ===");
      setAuthLoading(true);

      try {
        const teacher = users.teachers.find((t) => t.email === email);

        if (!teacher) {
          throw new Error("No account found with this email");
        }

        if (teacher.password !== password) {
          throw new Error("Incorrect password");
        }

        // ✅ FORCE SET USER ROLE TO TEACHER
        console.log("=== 🔑 LOGGING IN AS TEACHER ===");
        localStorage.setItem("userRole", "teacher");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: teacher.name,
            email: teacher.email,
          })
        );

        setUserRole("teacher");
        setCurrentUser({ name: teacher.name, email: teacher.email });

        setAuthLoading(false);
        console.log("=== ✅ TEACHER LOGIN SUCCESSFUL ===");
        return { success: true, message: "Login successful!" };
      } catch (error) {
        setAuthLoading(false);
        console.log("=== ❌ TEACHER LOGIN FAILED ===");
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
