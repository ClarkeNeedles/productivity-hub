"use client";

import { useState, useTransition } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Modern action handler replacing onSubmit
  const handleFormAction = (formData: FormData) => {
    setErrorMessage(null);
    
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setErrorMessage(result.error);
      }
    });
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sign in</h2>
      </div>

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Using the native HTML action attribute instead of onSubmit */}
      <form action={handleFormAction} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input 
            name="email" 
            type="email" 
            required 
            className="mt-1 block w-full rounded-lg border p-2 text-sm text-slate-950" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input 
            name="password" 
            type="password" 
            required 
            className="mt-1 block w-full rounded-lg border p-2 text-sm text-slate-950" 
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {isPending ? 'Verifying...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
