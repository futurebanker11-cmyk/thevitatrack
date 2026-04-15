'use client';
import { useEffect } from 'react';

/**
 * Activates FAQ accordion behavior on the page.
 * Finds all FAQ question buttons (.faq-q, .fq, or summary-like elements)
 * and attaches click handlers to toggle their answer panels.
 * Works with the HTML structure from converted static pages.
 */
export default function FAQActivator() {
  useEffect(() => {
    // Pattern 1: .faq-q buttons toggling .faq-a siblings
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const answer = item.querySelector('.faq-a');
        if (!answer) return;
        const isOpen = answer.classList.contains('show');
        // Close all
        document.querySelectorAll('.faq-a.show').forEach(a => a.classList.remove('show'));
        document.querySelectorAll('.faq-q.active').forEach(q => q.classList.remove('active'));
        // Toggle current
        if (!isOpen) {
          answer.classList.add('show');
          btn.classList.add('active');
        }
      });
    });

    // Pattern 2: .fq buttons (tool pages FAQ)
    document.querySelectorAll('.fq').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.fi');
        if (!item) return;
        const answer = item.querySelector('.fa');
        if (!answer) return;
        const el = answer as HTMLElement;
        const isOpen = el.style.display === 'block';
        // Close all
        document.querySelectorAll('.fa').forEach(a => {
          (a as HTMLElement).style.display = 'none';
        });
        // Toggle current
        if (!isOpen) {
          el.style.display = 'block';
        }
      });
    });

    // Pattern 3: details/summary elements (make them work natively)
    // These should work by default in HTML, no JS needed

    // Pattern 4: Any element with data-toggle="faq" pattern
    document.querySelectorAll('[data-faq-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.nextElementSibling;
        if (!target) return;
        const el = target as HTMLElement;
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
      });
    });
  }, []);

  return null;
}
