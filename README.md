# LingoTree

LingoTree is a language learning web app built with React and Tailwind CSS on the frontend, and Supabase as the backend. It enables users to learn languages through a unique, tree-like branching structure, where each topic can expand into subtopics, lessons, and translations.

## Libraries Used
- React
- Tailwind CSS
- Sigma.js (for interactive graph visualization)
- @supabase/supabase-js
- @heroicons/react
- react-markdown
- remark-gfm
- graphology

## Supabase Integration
Supabase powers the backend, providing:
- **Authentication:** Sign in with Google or email
- **Database:** PostgreSQL database to store all nodes and user data
- **Edge Functions:** Custom serverless functions to generate new nodes dynamically

## AI Integration
LingoTree uses the Perplexity API (Sonar-Pro model) to generate new content:
1. **Branching:** Splits a parent node (category) into up to 5 child nodes (subcategories)
2. **Lesson Generation:** For each child, creates a markdown lesson using the parent’s lesson and ancestry
3. **Translation Generation:** Produces 10 translations per child node based on the lesson
4. **Database Update:** Adds new nodes and translations to the database, then reloads the tree

## Hosting
The project is currently live at [https://lingotree.amcp.ie](https://lingotree.amcp.ie), but availability may be limited if API credits are exhausted.

---

Feel free to copy any components of my code.