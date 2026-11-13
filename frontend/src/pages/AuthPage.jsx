// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MonoEyebrow } from '../components/guide/MonoEyebrow';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

export function AuthPage({ initialMode = 'signin', nextUrl = '/contribute', onNavigate }) {
  const { signIn, register } = useAuth();
  const [isRegister, setIsRegister] = useState(initialMode === 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Full name is required.');
        await register(name.trim(), email.trim(), password);
      } else {
        await signIn(email.trim(), password);
      }
      onNavigate(nextUrl || '/contribute');
    } catch (err) {
      setErrorMsg(err.detail || err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-10">
      <div className="w-full max-w-[400px] bg-card/70 border border-border/80 rounded-lg p-8 sm:p-10 space-y-6">
        <div>
          <MonoEyebrow className="mb-2">
            {isRegister ? 'JOIN THE CURATION' : 'NOTEBOOK ACCESS'}
          </MonoEyebrow>
          <h2 className="font-display text-[28px] sm:text-[32px] text-foreground tracking-tight">
            {isRegister ? 'Begin your entries.' : 'Open your notebook'}
          </h2>
          <p className="font-mono text-[11px] text-muted-foreground mt-1">
            {isRegister
              ? 'CONTRIBUTIONS ARE SIGNED WITH YOUR NAME'
              : 'ENTER YOUR CREDENTIALS TO FILE ENTRIES'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded font-mono text-[11px] text-red-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                required
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
              EMAIL
            </label>
            <input
              type="email"
              required
              maxLength={100}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ada@fieldguide.dev"
              className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              required
              maxLength={100}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isRegister ? 'Create Account' : 'Open Notebook'}</span>
              )}
            </Button>
          </div>
        </form>

        <div className="pt-2 border-t border-border/80 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg('');
            }}
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {isRegister
              ? 'ALREADY HAVE A NOTEBOOK? SIGN IN'
              : 'NEW TO THE GUIDE? CREATE AN ACCOUNT'}
          </button>
        </div>
      </div>
    </div>
  );
}
