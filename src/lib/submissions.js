import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const submissionsDirectory = path.join(process.cwd(), 'content/submissions');

/**
 * Get all submission files
 */
export function getAllSubmissions() {
  if (!fs.existsSync(submissionsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(submissionsDirectory);
  const allSubmissions = fileNames
    .filter(fileName => fileName.endsWith('.md') && fileName !== 'README.md')
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(submissionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id,
        content,
        ...data
      };
    });

  // Sort by date, newest first
  return allSubmissions.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

/**
 * Get submissions filtered by unit codes
 */
export function getSubmissionsByUnit(pathCodes) {
  const allSubmissions = getAllSubmissions();

  return allSubmissions.filter(submission => {
    // Match based on hierarchy level
    if (pathCodes.uf && submission.uf !== pathCodes.uf) return false;
    if (pathCodes.aces && submission.aces !== pathCodes.aces) return false;
    if (pathCodes.uls && submission.uls !== pathCodes.uls) return false;
    if (pathCodes.ars && submission.ars !== pathCodes.ars) return false;
    return true;
  });
}

/**
 * Get submission by ID
 */
export function getSubmissionById(id) {
  const fullPath = path.join(submissionsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    id,
    content,
    ...data
  };
}

/**
 * Get submission count by unit
 */
export function getSubmissionCountByUnit(pathCodes) {
  return getSubmissionsByUnit(pathCodes).length;
}

