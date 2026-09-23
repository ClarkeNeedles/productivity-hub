import { redirect } from 'next/navigation';

export default async function RootPage() {
  // Add your actual auth check logic here
  const isAuthenticated = true; 

  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
