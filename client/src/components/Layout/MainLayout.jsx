import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
