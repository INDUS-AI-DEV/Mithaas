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

export async function getGraphPng(graphId: string, signal?: AbortSignal): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/graph/${graphId}`, { method: 'GET', signal });
  if (!res.ok) {
    throw new Error(`Graph API error ${res.status}`);
  }
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}


