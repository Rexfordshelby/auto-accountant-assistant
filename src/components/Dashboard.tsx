
// This file is read-only, so we're only creating a new component that will use our enhanced dashboard
// The user will need to import and use this component in their App.tsx file
import EnhancedDashboard from './EnhancedDashboard';

const DashboardWithEnhancements = () => {
  return <EnhancedDashboard />;
};

export default DashboardWithEnhancements;
