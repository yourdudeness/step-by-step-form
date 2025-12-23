type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function submitOnboarding(data: Record<string, unknown>) {
  const response = await fetch("/api/onboarding", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<{ userId: string }> = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Ошибка при отправке данных");
  }

  return result;
}