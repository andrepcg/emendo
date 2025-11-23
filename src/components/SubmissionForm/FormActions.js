'use client';

import { useRouter } from 'next/navigation';

export default function FormActions({ isSubmitting, isDisabled, onCancel }) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex gap-4">
      <button
        type="submit"
        disabled={isDisabled}
        className="btn-primary flex-1"
      >
        {isSubmitting ? 'A submeter...' : 'Reportar'}
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="btn-secondary"
      >
        Cancelar
      </button>
    </div>
  );
}

