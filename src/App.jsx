// src/App.jsx
import { Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { SubscriptionProvider } from './context/SubscriptionContext';

// This component wraps all child routes via <Outlet />
function AppLayout() {
  return (
    <SubscriptionProvider>
    <AppProvider>
      <Outlet /> {/* renders the matched child route */}
    </AppProvider>
    </SubscriptionProvider>
  );
}

export default AppLayout;