/**
 * LLM API 调用层 - 后端会处理 API Key
 */

export async function callLLMGenerate(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/llm/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return '';
    }

    const data = await response.json();
    return data.content || '';
  } catch (error) {
    console.error('LLM API call failed:', error);
    return '';
  }
}
