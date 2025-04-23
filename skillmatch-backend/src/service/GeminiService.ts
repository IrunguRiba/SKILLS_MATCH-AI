// src/services/gemini.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDI0mQ8bhasfCO5p_alwkD4NKY6PngTO8c');

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async analyzeSkillsAndMatchJobs(userSkills: string[], jobDescription: string): Promise<{ matchScore: number; analysis: string }> {
    const prompt = `
      Analyze how well the following user skills match the job requirements.
      Return a JSON response with a matchScore (0-100) and analysis (text explanation).

      User Skills: ${userSkills.join(', ')}
      Job Description: ${jobDescription}

      Response format:
      {
        "matchScore": number,
        "analysis": string
      }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      const jsonString = text.slice(jsonStart, jsonEnd);
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        matchScore: 0,
        analysis: 'Error analyzing skills match'
      };
    }
  }

  async generateJobRecommendations(userSkills: string[], jobs: any[]): Promise<any[]> {
    const prompt = `
      Based on the following user skills, rank these jobs by relevance and provide a brief explanation for each.
      Return a JSON array with the original job objects enhanced with matchScore and analysis.

      User Skills: ${userSkills.join(', ')}

      Jobs: ${JSON.stringify(jobs, null, 2)}

      Response format:
      [
        {
          ...originalJob,
          "matchScore": number,
          "analysis": string
        }
      ]
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      const jsonString = text.slice(jsonStart, jsonEnd);
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Gemini API error:', error);
      return jobs.map(job => ({
        ...job,
        matchScore: 0,
        analysis: 'Error generating recommendation'
      }));
    }
  }
}

export const geminiService = new GeminiService();