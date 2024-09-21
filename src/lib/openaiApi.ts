import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeComments(comments: string[]) {
  try {
    if (!comments || comments.length === 0) {
      throw new Error('No comments provided for analysis');
    }

    const prompt = `Analyze the following YouTube comments and provide a summary of the overall sentiment and key points:\n\n${comments.join('\n')}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: [
        { role: 'system', content: 'You are a helpful assistant that analyzes YouTube comments.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 150,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response received from OpenAI');
    }

    return response.choices[0].message.content?.trim() || 'Unable to generate summary.';
  } catch (error) {
    console.error('Error in analyzeComments:', error);

    if (error instanceof Error) {
      return `Error analyzing comments: ${error.message}`;
    } else {
      return 'An unexpected error occurred while analyzing comments.';
    }
  }
}
