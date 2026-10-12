import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { PageRoute } from '../types';
export function useNavigation() {
 const pathname = useRouterState({ select: state => state.location.pathname });
 const routerNavigate = useNavigate();
 const currentPath: PageRoute = pathname === '/menu' || pathname === '/about' || pathname === '/reservations' || pathname === '/contact' ? pathname : '/';
 return { currentPath, navigate: (path: PageRoute) => { void routerNavigate({ to: path }); } };
}
