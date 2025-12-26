import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-bg min-h-screen">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
