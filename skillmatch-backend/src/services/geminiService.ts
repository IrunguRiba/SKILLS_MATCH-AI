import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getSkillRecommendations = async (skills: string[]) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Based on these existing skills: ${skills.join(', ') || 'none'}, 
  suggest 3 complementary technical skills for a software developer. 
  Return ONLY a JSON array like ["skill1", "skill2", "skill3"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error('Gemini error:', error);
    return [];
  }
};