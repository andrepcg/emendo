'use client';

import { useState, useEffect, useRef } from 'react';
import SuccessMessage from './SubmissionForm/SuccessMessage';
import UnitField from './SubmissionForm/UnitField';
import CategoryField from './SubmissionForm/CategoryField';
import TitleField from './SubmissionForm/TitleField';
import DescriptionField from './SubmissionForm/DescriptionField';
import FormActions from './SubmissionForm/FormActions';

export default function SubmissionForm({ ufOptions }) {
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [formData, setFormData] = useState({
    unit: '',
    category: '',
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [success, setSuccess] = useState(false);
  const [prUrl, setPrUrl] = useState('');

  // Load Cloudflare Turnstile
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');

    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
          callback: (token) => {
            setTurnstileToken(token);
          },
        });
      }
    };

    if (existingScript) {
      // Script already loaded, just render widget
      renderWidget();
    } else {
      // Load script
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    }

    return () => {
      // Clean up widget on unmount
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!turnstileToken) {
      setError('Por favor, complete a verificação de segurança.');
      return;
    }

    if (!formData.unit || !formData.category || !formData.description || !formData.title) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao Reportar');
      }

      // Success! Show success message with PR URL
      setSuccess(true);
      setPrUrl(data.prUrl || '');
      setIsSubmitting(false);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
      // Reset turnstile
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setTurnstileToken('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUnitChange = (value) => {
    setFormData(prev => ({ ...prev, unit: value }));
  };

  // Show success message if submission was successful
  if (success) {
    return <SuccessMessage prUrl={prUrl} unitPath={formData.unit} />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <UnitField
          value={formData.unit}
          onChange={handleUnitChange}
          options={ufOptions}
          required
        />

        <CategoryField
          value={formData.category}
          onChange={handleChange}
          required
        />

        <TitleField
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
          required
        />

        <DescriptionField
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
        />

        {/* Turnstile */}
        <div ref={turnstileRef} />

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <FormActions
          isSubmitting={isSubmitting}
          isDisabled={isSubmitting || !turnstileToken}
        />
      </div>
    </form>
  );
}
