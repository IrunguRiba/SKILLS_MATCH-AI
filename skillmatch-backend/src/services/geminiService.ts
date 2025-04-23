import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getIntentQuery(message: string, userType: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  //handle the prompt
  const prompt = `

You are an AI SQL assistant for a job-matching platform. Your task is to generate a valid, safe SQL SELECT query for PostgreSQL.

The user is a ${userType}.
Here is their message:
"${message}"

Constraints:
- Only return a single valid SQL SELECT query.
- Do NOT include explanations, markdown formatting (like \`\`\`), or HTML tags.
- Query must return relevant data using appropriate WHERE clauses.
- Only generate SELECT queries (no INSERT, UPDATE, DELETE, etc).
- If filtering by values in array columns like "skills", "institution", or "project_url", use the PostgreSQL "ANY" operator. 
  For example: WHERE 'java' = ANY(skills)

Available tables:
- job_seekers_signup(id, email, first_name, last_name, city, county)
- recruiters(id, company_name, email, company_location)
- jobs(title, company, description, location, skills, deadline, requirements, id)
- portfolios(id, jobseeker_id, first_name, last_name, username, email, about, experiences, skills, institution, location, project_url)
`;

 
  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],

  })

  const response = result.response;
  let query = response.text().trim();


  // Clean up any accidental formatting like markdown or HTML tags
  query = query.replace(/```sql|```|<[^>]+>/gi, '').trim();

  // Optional: Only allow SELECT statements for safety
  if (!/^select\s/i.test(query)) {
    throw new Error('Only SELECT queries are allowed.');
  }

  return query;
}
