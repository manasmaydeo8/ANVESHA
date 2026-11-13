import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { MonoEyebrow } from '../components/guide/MonoEyebrow';
import { NumberedEntry } from '../components/guide/NumberedEntry';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function NotebookPage({ onNavigate }) {
  const { user } = useAuth();
  const [data, setData] = useState({ languages: [], facts: [], guidelines: [] });
  const [loading, setLoading] = useState(true);

  const fetchMyContributions = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api('/api/me/contributions');
      setData(res);
    } catch (err) {
      toast.error(err.message || 'Failed to load contributions');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMyContributions();
    }
  }, [user, fetchMyContributions]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="font-display text-[28px] text-foreground">
          Notebook is closed.
        </h2>
        <p className="font-sans text-[15px] text-muted-foreground">
          Please sign in to view your filed specimens, field notes, and rules.
        </p>
        <Button variant="primary" onClick={() => onNavigate('/signin?next=/me')}>
          Sign in
        </Button>
      </div>
    );
  }

  const handleDelete = async (type, id, label) => {
    if (!confirm(`Delete this ${label}?`)) return;
    try {
      await api(`/api/${type}/${id}`, { method: 'DELETE' });
      toast.success(`${label} deleted`);
      setData((prev) => ({
        ...prev,
        [type]: prev[type].filter((x) => x.id !== id),
      }));
    } catch (err) {
      toast.error(err.message || `Could not delete ${label}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-border/80">
        <MonoEyebrow className="mb-2">PERSONAL NOTEBOOK</MonoEyebrow>
        <h1 className="font-display text-[36px] sm:text-[44px] text-foreground tracking-tight">
          {user.name}’s Filed Entries
        </h1>
        <p className="font-mono text-[12px] text-muted-foreground mt-1">
          {user.email} · ALL ENTRIES ARE VERIFIABLE AND OWNER-EDITABLE
        </p>
      </div>

      {loading ? (
        <div className="space-y-4 py-8 animate-pulse font-mono text-[12px] text-muted-foreground">
          FETCHING YOUR CONTRIBUTIONS...
        </div>
      ) : (
        <div className="space-y-12">
          {/* Languages */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[24px] text-foreground">
                Specimens Filed ({data.languages.length})
              </h2>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('/contribute?type=language')}>
                + File a language
              </Button>
            </div>

            {data.languages.length === 0 ? (
              <p className="text-[14px] text-muted-foreground font-sans italic">
                You haven't filed any new language specimens yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.languages.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => onNavigate(`/languages/${l.slug}`)}
                    className="p-5 bg-card/60 border border-border/80 rounded-md hover:border-foreground/30 transition-colors cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                      <span>NO. {String(l.specimen_no).padStart(3, '0')}</span>
                      <span>ERA {l.year}</span>
                    </div>
                    <h3 className="font-display text-[22px] text-foreground">
                      {l.name}
                    </h3>
                    <p className="font-sans text-[13px] text-muted-foreground line-clamp-2">
                      {l.tagline || l.overview}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Facts */}
          <section className="space-y-4">
            <h2 className="font-display text-[24px] text-foreground">
              Field Notes ({data.facts.length})
            </h2>

            {data.facts.length === 0 ? (
              <p className="text-[14px] text-muted-foreground font-sans italic">
                No field notes filed yet.
              </p>
            ) : (
              <div>
                {data.facts.map((f, idx) => (
                  <NumberedEntry
                    key={f.id}
                    index={idx + 1}
                    body={f.text}
                    author={user.name}
                    votes={f.votes}
                    voted={f.voted}
                    canDelete={true}
                    onDelete={() => handleDelete('facts', f.id, 'field note')}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Guidelines */}
          <section className="space-y-4">
            <h2 className="font-display text-[24px] text-foreground">
              Guidelines ({data.guidelines.length})
            </h2>

            {data.guidelines.length === 0 ? (
              <p className="text-[14px] text-muted-foreground font-sans italic">
                No guidelines filed yet.
              </p>
            ) : (
              <div>
                {data.guidelines.map((g, idx) => (
                  <NumberedEntry
                    key={g.id}
                    index={idx + 1}
                    title={g.title}
                    body={g.body}
                    whenToUse={g.when_to_use}
                    avoid={g.avoid}
                    author={user.name}
                    votes={g.votes}
                    voted={g.voted}
                    canDelete={true}
                    onDelete={() => handleDelete('guidelines', g.id, 'guideline')}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
