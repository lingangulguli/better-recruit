import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 加载环境变量
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/**
 * LLM API 端点 - 调用 DeepSeek
 */
app.post('/api/llm/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';

    if (!apiKey) {
      console.warn('DEEPSEEK API KEY not configured');
      return res.status(401).json({ error: 'API key not configured' });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的招聘海报文案作者。生成简洁、吸引人的招聘文案。只返回文案内容，不要额外说明。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`DeepSeek API error: ${response.status}`, error);
      return res.status(response.status).json({ error: 'LLM API failed' });
    }

    const data = await response.json();
    const content = data.choices[0].message.content || '';

    res.json({ content });
  } catch (error) {
    console.error('Error in LLM endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 LLM API server running on http://localhost:${PORT}`);
  console.log(`📝 Endpoints:`);
  console.log(`   POST /api/llm/generate - 调用 LLM 生成文案`);
  console.log(`   GET  /api/health - 服务健康检查`);
});
