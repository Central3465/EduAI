// src/context/SubscriptionContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useAppContext } from "./AppContext";

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};

// ✅ Add your admin email here
const ADMIN_EMAILS = [
  "hanlinbai667@gmail.com", // Your email
  "admin@eduai.com", // Example - add more if needed
];

export const SubscriptionProvider = ({ children }) => {
  // ✅ Safely get context values with defaults
  const appContext = useAppContext();
  const { currentUser, userRole } = appContext || {}; // ✅ Safe destructuring with fallback

  const [loading, setLoading] = useState(true);
  const [trialEnded, setTrialEnded] = useState(false);

  const initialSubscription =
    currentUser?.email && ADMIN_EMAILS.includes(currentUser.email)
      ? {
          id: "admin_override",
          userId: currentUser.email,
          planId: "enterprise",
          status: "active",
          isAdmin: true,
        }
      : null;

  const [subscription, setSubscription] = useState(initialSubscription);

  console.log("Checking admin status for:", currentUser?.email);

  // ✅ Load subscription from localStorage
  useEffect(() => {
    const loadSubscription = () => {
      console.log("Checking admin status for:", currentUser?.email);

      if (
        currentUser?.email &&
        ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(
          currentUser.email.toLowerCase()
        )
      ) {
        console.log("=== ADMIN DETECTED ===", currentUser.email);
        setSubscription({
          id: "admin_override",
          userId: currentUser.email,
          planId: "enterprise",
          status: "active",
          isAdmin: true,
          features: [
            "Unlimited everything",
            "Admin dashboard access",
            "Full AI features",
            "All premium tools",
            "Priority support",
          ],
        });
        setLoading(false);
        return;
      }

      // ✅ Only load subscription for teachers
      if (userRole === "teacher" && currentUser?.email) {
        const saved = localStorage.getItem(`subscription_${currentUser.email}`);
        if (saved) {
          const sub = JSON.parse(saved);
          setSubscription(sub);

          // Check if trial has ended
          if (sub.planId === "free" && sub.trialEndsAt) {
            const trialEndDate = new Date(sub.trialEndsAt);
            const now = new Date();
            if (now > trialEndDate) {
              setTrialEnded(true);
            }
          }
        } else {
          // Create free trial for new teachers
          createFreeTrial();
        }
      }
      setLoading(false);
    };

    if (currentUser !== undefined) {
      loadSubscription();
    }
  }, [currentUser, userRole]); // ✅ Dependencies

  // ✅ Save subscription to localStorage
  useEffect(() => {
    if (subscription && currentUser?.email && !subscription.isAdmin) {
      localStorage.setItem(
        `subscription_${currentUser.email}`,
        JSON.stringify(subscription)
      );
    }
  }, [subscription, currentUser]);

  // ✅ Create free trial subscription
  const createFreeTrial = useCallback(() => {
    // ✅ Check if user is admin
    if (currentUser?.email && ADMIN_EMAILS.includes(currentUser.email)) {
      setSubscription({
        id: "admin_override",
        userId: currentUser.email,
        planId: "enterprise",
        status: "active",
        isAdmin: true,
        features: [
          "Unlimited everything",
          "Admin dashboard access",
          "Full AI features",
          "All premium tools",
          "Priority support",
        ],
      });
      return;
    }

    if (userRole === "teacher" && currentUser?.email) {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7); // 7-day trial

      const newSubscription = {
        id: `sub_${Date.now()}`,
        userId: currentUser.email,
        planId: "free",
        status: "active",
        startDate: new Date().toISOString(),
        trialEndsAt: trialEndsAt.toISOString(),
        features: [
          "7-day free trial",
          "Create up to 5 assignments",
          "Basic AI question generation",
          "Up to 30 students",
          "Basic analytics",
        ],
      };

      setSubscription(newSubscription);
      return newSubscription;
    }
    return null;
  }, [currentUser, userRole]);

  // ✅ Upgrade subscription
  const upgradeSubscription = useCallback(
    (planId) => {
      // ✅ Check if user is admin
      if (currentUser?.email && ADMIN_EMAILS.includes(currentUser.email)) {
        setSubscription({
          id: "admin_override",
          userId: currentUser.email,
          planId: "enterprise",
          status: "active",
          isAdmin: true,
          features: [
            "Unlimited everything",
            "Admin dashboard access",
            "Full AI features",
            "All premium tools",
            "Priority support",
          ],
        });
        return {
          id: "admin_override",
          planId: "enterprise",
          status: "active",
          isAdmin: true,
        };
      }

      if (userRole === "teacher" && currentUser?.email) {
        const planFeatures = {
          basic: [
            "Unlimited assignments",
            "Advanced AI question generation",
            "Up to 100 students",
            "Detailed analytics",
            "Gradebook integration",
            "Priority email support",
          ],
          pro: [
            "Everything in Basic",
            "Unlimited students",
            "Class management",
            "Custom branding",
            "Advanced analytics",
            "24/7 priority support",
            "API access",
          ],
        };

        const newSubscription = {
          id: `sub_${Date.now()}`,
          userId: currentUser.email,
          planId: planId,
          status: "active",
          startDate: new Date().toISOString(),
          features: planFeatures[planId] || [],
        };

        setSubscription(newSubscription);
        return newSubscription;
      }
      return null;
    },
    [currentUser, userRole]
  );

  // ✅ Cancel subscription
  const cancelSubscription = useCallback(() => {
    // ✅ Admins can't cancel their override
    if (subscription?.isAdmin) {
      console.log("Admin override cannot be cancelled");
      return;
    }

    if (subscription) {
      setSubscription((prev) => ({
        ...prev,
        status: "cancelled",
        cancelledAt: new Date().toISOString(),
      }));
    }
  }, [subscription]);

  // ✅ Check if user can access dashboard
  const canAccessDashboard = useCallback(() => {
    // ✅ Admins always have access
    if (subscription?.isAdmin) return true;

    if (userRole !== "teacher") return true; // Students always have access

    if (!subscription) return false;

    // Free trial users can access during trial period
    if (subscription.planId === "free" && !trialEnded) {
      return true;
    }

    // Paid users can access
    if (
      ["basic", "pro", "enterprise"].includes(subscription.planId) &&
      subscription.status === "active"
    ) {
      return true;
    }

    return false;
  }, [subscription, userRole, trialEnded]);

  // ✅ Check if user can use AI features
  const canUseAI = useCallback(() => {
    // ✅ Admins always have AI access
    if (subscription?.isAdmin) return true;

    if (userRole === "teacher") {
      // Teachers need paid plan for AI
      return (
        subscription &&
        ["basic", "pro", "enterprise"].includes(subscription.planId) &&
        subscription.status === "active"
      );
    } else {
      // Students need paid plan for AI Recommendations
      return (
        subscription &&
        ["basic", "pro", "enterprise"].includes(subscription.planId) &&
        subscription.status === "active"
      );
    }
  }, [subscription, userRole]);

  // ✅ Check if user is admin (NEW FUNCTION)
  const isAdmin = useCallback(() => {
    // ✅ Check if current user is in admin list
    if (currentUser?.email && ADMIN_EMAILS.includes(currentUser.email)) {
      return true;
    }

    // ✅ Check if subscription marks user as admin
    return subscription?.isAdmin || false;
  }, [currentUser, subscription]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        trialEnded,
        createFreeTrial,
        upgradeSubscription,
        cancelSubscription,
        canAccessDashboard,
        canUseAI,
        isAdmin, // ✅ Export isAdmin function
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
