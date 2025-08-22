export const API_BASE_URL = 'http://34.14.206.218:8501';

export interface ChatRequest {
  message: string;
  session_id?: string | null;
}

export interface ChatResponse {
  response: string;
  graphs?: string[] | null;
  query_type: string;
  session_id: string;
}

export async function postChat(req: ChatRequest, signal?: AbortSignal): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: req.message, session_id: req.session_id ?? null }),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Chat API error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}


