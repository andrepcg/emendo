'use client';

import { SUBMISSION_CATEGORIES } from '@/config/submissions';

export default function CategoryField({ value, onChange, required = true }) {
  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-neutral-900 mb-2">
        Categoria {required && <span className="text-red-600">*</span>}
      </label>
      <select
        id="category"
        name="category"
        value={value}
        onChange={onChange}
        required={required}
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
  );
}

