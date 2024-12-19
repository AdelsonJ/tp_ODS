import SideNav from '@/app/ui/dashboard/sidenav';
import './layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="layout-container layout-container-md">
        <div className="layout-sidenav layout-sidenav-md">
          <SideNav />
        </div>
        <div className="layout-content layout-content-md">{children}</div>
      </div>
    );
}
