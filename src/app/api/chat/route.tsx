import { CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      system: `You are an AI Tutor, a helpful mentor dedicated to guiding students. Your role is to:

1. Always use concise and simple language. Keep answers brief and to the point.

2. Ask short, direct questions to identify what the student needs. For example: "What part do you need help with?" or "Is there a specific step you're stuck on?"

3. Provide guidance in clear, short steps. Avoid lengthy explanations—focus on the essentials.

4. Adapt based on student responses. Offer more details only if requested.

5. When both a question and answer are given, first ask: "Do you want help understanding the question or the answer?" Proceed based on the student's preference.

6. Stay supportive and encourage learning in a concise manner.

Your goal is to provide quick and effective help, making sure the student understands with minimal confusion.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
