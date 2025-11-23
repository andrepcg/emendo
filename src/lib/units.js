import unitsData from '@/config/units.json';

/**
 * Get all ARS (Regional Health Administrations)
 */
export function getAllARS() {
  return unitsData.ARSList || [];
}

/**
 * Get all ULS (Local Health Units)
 */
export function getAllULS() {
  return unitsData.ULSList || [];
}

/**
 * Get all ACES (Health Centers Groups)
 */
export function getAllACES() {
  return unitsData.ACESList || [];
}

/**
 * Get all UF (Functional Units)
 */
export function getAllUF() {
  return unitsData.UFList || [];
}

/**
 * Get entity by code
 */
export function getEntityByCode(code, type = 'all') {
  const lists = {
    ars: unitsData.ARSList,
    uls: unitsData.ULSList,
    aces: unitsData.ACESList,
    uf: unitsData.UFList
  };

  if (type === 'all') {
    for (const list of Object.values(lists)) {
      const entity = list?.find(item => item.Code === parseInt(code));
      if (entity) return entity;
    }
    return null;
  }

  return lists[type]?.find(item => item.Code === parseInt(code)) || null;
}

/**
 * Get ULS by parent ARS code
 */
export function getULSByARS(arsCode) {
  return unitsData.ULSList?.filter(uls => uls.ParentCode === parseInt(arsCode)) || [];
}

/**
 * Get ACES by parent ULS code
 */
export function getACESByULS(ulsCode) {
  return unitsData.ACESList?.filter(aces => aces.ParentCode === parseInt(ulsCode)) || [];
}

/**
 * Get UF by parent ACES code
 */
export function getUFByACES(acesCode) {
  return unitsData.UFList?.filter(uf => uf.ParentCode === parseInt(acesCode)) || [];
}

/**
 * Get hierarchy breadcrumb for a given path
 * @param {Object} pathCodes - { ars, uls, aces, uf }
 * @returns {Array} Array of breadcrumb items with { code, title, url, type }
 */
export function getHierarchyBreadcrumb(pathCodes) {
  const breadcrumb = [];

  if (pathCodes.ars) {
    const ars = getEntityByCode(pathCodes.ars, 'ars');
    if (ars) {
      breadcrumb.push({
        code: ars.Code,
        title: ars.Title,
        url: `/s/${ars.Code}`,
        type: 'ars'
      });
    }
  }

  if (pathCodes.uls) {
    const uls = getEntityByCode(pathCodes.uls, 'uls');
    if (uls) {
      breadcrumb.push({
        code: uls.Code,
        title: uls.Title,
        url: `/s/${pathCodes.ars}/${uls.Code}`,
        type: 'uls'
      });
    }
  }

  if (pathCodes.aces) {
    const aces = getEntityByCode(pathCodes.aces, 'aces');
    if (aces) {
      breadcrumb.push({
        code: aces.Code,
        title: aces.Title,
        url: `/s/${pathCodes.ars}/${pathCodes.uls}/${aces.Code}`,
        type: 'aces'
      });
    }
  }

  if (pathCodes.uf) {
    const uf = getEntityByCode(pathCodes.uf, 'uf');
    if (uf) {
      breadcrumb.push({
        code: uf.Code,
        title: uf.Title,
        url: `/s/${pathCodes.ars}/${pathCodes.uls}/${pathCodes.aces}/${uf.Code}`,
        type: 'uf'
      });
    }
  }

  return breadcrumb;
}

/**
 * Get children for a given path (next level in hierarchy)
 */
export function getChildren(pathCodes) {
  if (pathCodes.aces && !pathCodes.uf) {
    return getUFByACES(pathCodes.aces);
  }
  if (pathCodes.uls && !pathCodes.aces) {
    return getACESByULS(pathCodes.uls);
  }
  if (pathCodes.ars && !pathCodes.uls) {
    return getULSByARS(pathCodes.ars);
  }
  if (!pathCodes.ars) {
    return getAllARS();
  }
  return [];
}

/**
 * Get all possible UF options for form dropdown (grouped by hierarchy)
 */
export function getAllUFOptions() {
  const options = [];

  for (const ars of getAllARS()) {
    const ulsUnits = getULSByARS(ars.Code);
    for (const uls of ulsUnits) {
      const acesUnits = getACESByULS(uls.Code);
      for (const aces of acesUnits) {
        const ufUnits = getUFByACES(aces.Code);
        for (const uf of ufUnits) {
          options.push({
            value: `${ars.Code}/${uls.Code}/${aces.Code}/${uf.Code}`,
            label: `${uf.Title} (${ars.Title.replace('ARS ', '')})`,
            ars: ars.Code,
            uls: uls.Code,
            aces: aces.Code,
            uf: uf.Code,
            arsTitle: ars.Title,
            ulsTitle: uls.Title,
            acesTitle: aces.Title,
            ufTitle: uf.Title
          });
        }
      }
    }
  }

  return options.sort((a, b) => a.label.localeCompare(b.label, 'pt'));
}

