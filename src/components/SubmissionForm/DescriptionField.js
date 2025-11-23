'use client';

export default function DescriptionField({ value, onChange, required = true, rows = 6 }) {
  return (
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-neutral-900 mb-2">
        Descrição {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder="Descreva o problema operacional ou burocrático de forma objetiva e clara. Inclua exemplos concretos se possível..."
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none resize-none"
      />
      <p className="mt-2 text-sm text-neutral-600">
        Esta submissão será pública e anónima. Foque-se em problemas sistémicos e operacionais, não em pessoas específicas.
      </p>
    </div>
  );
}

