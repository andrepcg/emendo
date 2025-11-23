'use client';

import UnitAutocomplete from '../UnitAutocomplete';

export default function UnitField({ value, onChange, options, required = true }) {
  return (
    <div>
      <label htmlFor="unit" className="block text-sm font-medium text-neutral-900 mb-2">
        Unidade de Saúde {required && <span className="text-red-600">*</span>}
      </label>
      <UnitAutocomplete
        options={options}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

