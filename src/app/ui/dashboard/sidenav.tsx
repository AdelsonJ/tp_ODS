import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import './sidenav.css';

export default function SideNav() {
  return (
    <div className="sidenav-container">
      
		<Link className="sidenav-logo sidenav-logo-md" href="/">
			<div className="sidenav-logo-text">
				<h2>Logo</h2>
			</div>
		</Link>
      
	  	<div className="sidenav-main sidenav-main-md">
			<NavLinks />
	  	</div>
    </div>
  );
}
