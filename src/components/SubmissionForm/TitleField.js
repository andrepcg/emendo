'use client';

export default function TitleField({ value, onChange, maxLength = 100, ...props }) {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-neutral-900 mb-2">
        Título {props.required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder="Ex: Equipamento de raio-X avariado há 2 meses sem previsão de reparação"
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
        {...props}
      />
    </div>
  );
}

