import { FLOWORKA_SYSTEM_PROMPT } from "@/lib/knowledge";

export async function POST(req: Request) {
  const { messages, lang } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response("Messages invalides", { status: 400 });
  }

  // Sanitize: only allow user/assistant roles, cap array and content length
  const safe = messages
    .filter((m: unknown) => {
      if (typeof m !== "object" || m === null) return false;
      const msg = m as Record<string, unknown>;
      return (msg.role === "user" || msg.role === "assistant") && typeof msg.content === "string";
    })
    .slice(0, 20)
    .map((m: Record<string, unknown>) => ({
      role: m.role as "user" | "assistant",
      content: (m.content as string).slice(0, 2000),
    }));

  if (safe.length === 0) {
    return new Response("Messages invalides", { status: 400 });
  }

  const langInstruction =
    lang === "en"
      ? "\n\nIMPORTANT: Always respond in English only, regardless of the language the visitor uses. All lead collection messages must also be in English."
      : lang === "ru"
      ? "\n\nВАЖНО: Всегда отвечай исключительно на русском языке, независимо от языка посетителя. Все сообщения о сборе контактов тоже на русском."
      : "\n\nIMPORTANT: Réponds toujours exclusivement en français, quelle que soit la langue utilisée par le visiteur.";

  const systemPrompt = FLOWORKA_SYSTEM_PROMPT + langInstruction;

  const resp = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      max_tokens: 512,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...safe,
      ],
    }),
  });

  if (!resp.ok || !resp.body) {
    return new Response("Erreur DeepSeek", { status: 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readable = new ReadableStream({
    async start(controller) {
      const reader = resp.body!.getReader();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const chunk = JSON.parse(data);
            const text = chunk.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // ignore malformed chunks
          }
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
