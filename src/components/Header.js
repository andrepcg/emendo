import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-neutral-900">Emendo</h1>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/submeter"
              className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              Reportar
            </Link>
            <Link
              href="/sobre"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Sobre
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

