'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import UnitAutocomplete from './UnitAutocomplete';
import { SUBMISSION_CATEGORIES } from '@/config/submissions';

export default function SubmissionForm({ ufOptions }) {
  const router = useRouter();
  const turnstileRef = useRef(null);
  const [formData, setFormData] = useState({
    unit: '',
    category: '',
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // Load Cloudflare Turnstile
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
          callback: (token) => {
            setTurnstileToken(token);
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
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

    if (!formData.unit || !formData.category || !formData.description) {
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

      // Success! Redirect to the unit page
      router.push(`/s/${formData.unit}?success=true`);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
      // Reset turnstile
      if (window.turnstile) {
        window.turnstile.reset();
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

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Unit Selection */}
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-neutral-900 mb-2">
            Unidade de Saúde <span className="text-red-600">*</span>
          </label>
          <UnitAutocomplete
            options={ufOptions}
            value={formData.unit}
            onChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-900 mb-2">
            Categoria <span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none font-sans"
            style={{ fontFamily: 'inherit' }}
          >
            <option value="">Selecione a categoria...</option>
            {SUBMISSION_CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Title (Optional) */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-900 mb-2">
            Título (Opcional)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            placeholder="Ex: Equipamento de raio-X avariado há 2 meses sem previsão de reparação"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-900 mb-2">
            Descrição <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Descreva o problema operacional ou burocrático de forma objetiva e clara. Inclua exemplos concretos se possível..."
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none resize-none"
          />
          <p className="mt-2 text-sm text-neutral-600">
            Esta submissão será pública e anónima. Foque-se em problemas sistémicos e operacionais, não em pessoas específicas.
          </p>
        </div>

        {/* Turnstile */}
        <div ref={turnstileRef} />

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'A submeter...' : 'Reportar'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-neutral-300 text-neutral-900 rounded-lg hover:border-neutral-400 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
