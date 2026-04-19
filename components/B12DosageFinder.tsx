'use client';
import { useState } from 'react';
import { calculateB12Dose, type B12Inputs } from '@/data/b12-dosage-logic';

const urgencyColors = {
  routine: { bg: '#F0FAF3', border: '#1E6B3E', text: '#14442A', badge: '#1E6B3E' },
  elevated: { bg: '#FFF8E1', border: '#F59E0B', text: '#78350F', badge: '#D97706' },
  urgent:   { bg: '#FEF2F2', border: '#EF4444', text: '#7F1D1D', badge: '#DC2626' },
};

export default function B12DosageFinder() {
  const [form, setForm] = useState<B12Inputs>({
    age: '60-69',
    gender: 'male',
    diet: 'omnivore',
    medications: false,
    symptoms: false,
  });
  const [result, setResult] = useState<ReturnType<typeof calculateB12Dose> | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(calculateB12Dose(form));
  }

  const colors = result ? urgencyColors[result.urgency] : null;

  return (
    <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '16px', padding: '28px 24px', margin: '32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{ fontSize: '2rem' }}>💊</span>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#14442A', margin: 0 }}>B12 Dosage Finder</h3>
          <p style={{ fontSize: '0.9rem', color: '#555550', margin: 0 }}>Personalized recommendation in 30 seconds</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        {/* Age */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, color: '#2C2C2A', marginBottom: '8px', fontSize: '0.95rem' }}>
            Your age group
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(['60-69', '70-79', '80+'] as const).map(a => (
              <button key={a} type="button"
                onClick={() => setForm(f => ({ ...f, age: a }))}
                style={{
                  padding: '8px 18px', borderRadius: '8px', border: '2px solid',
                  borderColor: form.age === a ? '#1E6B3E' : '#E8E6E1',
                  background: form.age === a ? '#1E6B3E' : '#fff',
                  color: form.age === a ? '#fff' : '#2C2C2A',
                  fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >{a}</button>
            ))}
          </div>
        </div>

        {/* Diet */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, color: '#2C2C2A', marginBottom: '8px', fontSize: '0.95rem' }}>
            Your diet
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {([['omnivore', 'Meat & dairy'], ['vegetarian', 'Vegetarian'], ['vegan', 'Vegan']] as const).map(([val, label]) => (
              <button key={val} type="button"
                onClick={() => setForm(f => ({ ...f, diet: val }))}
                style={{
                  padding: '8px 18px', borderRadius: '8px', border: '2px solid',
                  borderColor: form.diet === val ? '#1E6B3E' : '#E8E6E1',
                  background: form.diet === val ? '#1E6B3E' : '#fff',
                  color: form.diet === val ? '#fff' : '#2C2C2A',
                  fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* Checkboxes */}
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { key: 'medications' as const, label: 'Taking metformin, a PPI (omeprazole, pantoprazole), or H2 blocker (famotidine, ranitidine)' },
            { key: 'symptoms' as const, label: 'Experiencing fatigue, tingling hands/feet, or memory problems' },
          ].map(({ key, label }) => (
            <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: '#1E6B3E', flexShrink: 0 }}
              />
              <span style={{ fontSize: '0.95rem', color: '#2C2C2A', lineHeight: 1.4 }}>{label}</span>
            </label>
          ))}
        </div>

        <button type="submit" style={{
          background: '#1E6B3E', color: '#fff', border: 'none', borderRadius: '10px',
          padding: '14px 28px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer',
          width: '100%', transition: 'background 150ms',
        }}>
          Get My B12 Recommendation →
        </button>
      </form>

      {result && colors && (
        <div style={{
          marginTop: '24px', background: colors.bg, border: `2px solid ${colors.border}`,
          borderRadius: '12px', padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{
              background: colors.badge, color: '#fff', fontSize: '0.8rem', fontWeight: 700,
              padding: '3px 10px', borderRadius: '20px',
            }}>
              {result.urgency === 'urgent' ? '⚠ See Your Doctor' : result.urgency === 'elevated' ? '★ Elevated Need' : '✓ Routine'}
            </span>
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div><span style={{ fontSize: '0.85rem', color: '#717170', display: 'block' }}>Daily dose</span>
              <strong style={{ fontSize: '1.4rem', color: colors.text }}>{result.dailyDose}</strong></div>
            <div><span style={{ fontSize: '0.85rem', color: '#717170', display: 'block' }}>Best form</span>
              <span style={{ fontWeight: 600, color: colors.text, textTransform: 'capitalize' }}>{result.form}</span></div>
            <div><span style={{ fontSize: '0.85rem', color: '#717170', display: 'block' }}>Take it</span>
              <span style={{ fontWeight: 600, color: colors.text, textTransform: 'capitalize' }}>{result.timing}</span></div>
          </div>
          <p style={{ marginTop: '14px', fontSize: '0.9rem', color: colors.text, lineHeight: 1.6, borderTop: `1px solid ${colors.border}`, paddingTop: '12px' }}>
            {result.note}
          </p>
          <a href="https://amzn.to/4sEloLH" target="_blank" rel="nofollow noopener noreferrer"
            style={{
              display: 'block', marginTop: '14px', background: '#FF9900', color: '#000',
              textDecoration: 'none', padding: '12px 20px', borderRadius: '8px',
              fontWeight: 700, fontSize: '0.95rem', textAlign: 'center',
            }}>
            View Recommended B12 Supplement on Amazon →
          </a>
          <p style={{ fontSize: '0.75rem', color: '#717170', marginTop: '8px', textAlign: 'center' }}>
            This tool provides general guidance only — not a substitute for medical advice.
          </p>
        </div>
      )}
    </div>
  );
}
