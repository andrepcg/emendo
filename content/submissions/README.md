# Emendo - Submissions

This directory contains all submitted reports as markdown files with front matter.

## File Format

Each submission is stored as a markdown file with the following front matter structure:

```yaml
---
id: unique-submission-id
createdAt: ISO-8601-timestamp
ars: ARS-code
uls: ULS-code
aces: ACES-code
uf: UF-code
arsTitle: ARS-name
ulsTitle: ULS-name
acesTitle: ACES-name
ufTitle: UF-name
category: Category-name
title: Optional-title
---

Report description/content goes here...
```

## Submission Process

Submissions are created via pull requests:

1. User submits report through the website form
2. Cloudflare Pages Function validates the submission with Turnstile
3. Function creates a new branch and adds the submission file
4. Function opens a pull request
5. Maintainers review and merge the PR
6. Site is automatically rebuilt with the new submission

## Privacy

All submissions are anonymous. The system does not collect or store any personally identifiable information.

