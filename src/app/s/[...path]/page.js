import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SubmissionCard from '@/components/SubmissionCard';
import { getHierarchyBreadcrumb, getChildren, getEntityByCode } from '@/lib/units';
import { getSubmissionsByUnit } from '@/lib/submissions';

export default async function UnitPage({ params }) {
  const { path } = await params;

  // Parse the path segments
  const pathCodes = {};
  if (path && path.length > 0) {
    pathCodes.ars = parseInt(path[0]);
    if (path.length > 1) pathCodes.uls = parseInt(path[1]);
    if (path.length > 2) pathCodes.aces = parseInt(path[2]);
    if (path.length > 3) pathCodes.uf = parseInt(path[3]);
  }

  // Validate the hierarchy
  const breadcrumb = getHierarchyBreadcrumb(pathCodes);
  if (breadcrumb.length === 0) {
    notFound();
  }

  // Get current entity
  const currentLevel = breadcrumb[breadcrumb.length - 1];

  // Get children (next level in hierarchy)
  const children = getChildren(pathCodes);

  // Get submissions for this unit
  const submissions = getSubmissionsByUnit(pathCodes);

  // Determine if we're at the deepest level (UF)
  const isDeepestLevel = pathCodes.uf !== undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb items={breadcrumb} />

      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
        {currentLevel.title}
      </h1>

      <p className="text-neutral-600 mb-8">
        {submissions.length} {submissions.length === 1 ? 'submissão' : 'submissões'}
      </p>

      {/* Children Navigation */}
      {children.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            {isDeepestLevel ? 'Unidades' : 'Navegar'}
          </h2>
          <div className="grid gap-3">
            {children.map(child => {
              const childPath = pathCodes.uf
                ? `/s/${pathCodes.ars}/${pathCodes.uls}/${pathCodes.aces}/${pathCodes.uf}/${child.Code}`
                : pathCodes.aces
                ? `/s/${pathCodes.ars}/${pathCodes.uls}/${pathCodes.aces}/${child.Code}`
                : pathCodes.uls
                ? `/s/${pathCodes.ars}/${pathCodes.uls}/${child.Code}`
                : `/s/${pathCodes.ars}/${child.Code}`;

              return (
                <Link
                  key={child.Code}
                  href={childPath}
                  className="block p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-white transition-all"
                >
                  <h3 className="font-medium text-neutral-900">
                    {child.Title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Submissions List */}
      {submissions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Submissões
          </h2>
          <div className="grid gap-6">
            {submissions.map(submission => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        </section>
      )}

      {submissions.length === 0 && children.length === 0 && (
        <div className="text-center py-16 border border-dashed border-neutral-300 rounded-lg">
          <p className="text-neutral-600 mb-4">
            Ainda não há submissões para esta unidade.
          </p>
          <Link
            href="/submeter"
            className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
          >
            Enviar
          </Link>
        </div>
      )}
    </div>
  );
}

// Generate static paths for all possible unit combinations
export async function generateStaticParams() {
  const { getAllARS, getULSByARS, getACESByULS, getUFByACES } = await import('@/lib/units');

  const paths = [];
  const regions = getAllARS();

  for (const region of regions) {
    // ARS level
    paths.push({ path: [region.Code.toString()] });

    const ulsUnits = getULSByARS(region.Code);
    for (const uls of ulsUnits) {
      // ULS level
      paths.push({ path: [region.Code.toString(), uls.Code.toString()] });

      const acesUnits = getACESByULS(uls.Code);
      for (const aces of acesUnits) {
        // ACES level
        paths.push({ path: [region.Code.toString(), uls.Code.toString(), aces.Code.toString()] });

        const ufUnits = getUFByACES(aces.Code);
        for (const uf of ufUnits) {
          // UF level
          paths.push({ path: [region.Code.toString(), uls.Code.toString(), aces.Code.toString(), uf.Code.toString()] });
        }
      }
    }
  }

  return paths;
}

