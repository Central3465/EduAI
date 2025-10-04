// src/App.jsx
import { Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// This component wraps all child routes via <Outlet />
function AppLayout() {
  return (
    <AppProvider>
      <Outlet /> {/* renders the matched child route */}
    </AppProvider>
  );
}

export default AppLayout;