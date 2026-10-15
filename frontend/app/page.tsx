import { redirect } from 'next/navigation';

export default function RootPage() {
  // The middleware handles all redirects, but Next.js requires 
  // a default export component for the route to build successfully.
  redirect('/dashboard');

  return null;
}
