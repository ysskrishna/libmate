import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';

const CommonLayout = ({ allowedRoles, children }) => {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="flex h-screen flex-col lg:flex-row">
        <Sidebar />
        <>
            {children}
        </>
      </div>
    </ProtectedRoute>
  );
};

export default CommonLayout;