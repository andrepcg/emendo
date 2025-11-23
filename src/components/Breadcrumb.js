import Link from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-6 text-sm">
      <ol className="flex items-center gap-2 text-neutral-600">
        <li>
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Início
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.code} className="flex items-center gap-2">
            <span className="text-neutral-400">/</span>
            {index === items.length - 1 ? (
              <span className="text-neutral-900 font-medium">{item.title}</span>
            ) : (
              <Link href={item.url} className="hover:text-neutral-900 transition-colors">
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

