export interface RequestParams<T> {
  endpoint: string;
  data: T;
}

export const sendAuthRequest = async <T>(params: RequestParams<T>) => {
  const { endpoint, data } = params;

  try {
    const response = await fetch(`http://localhost:8081/auth/${endpoint}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Помилка при ${endpoint === 'login' ? 'вході' : 'реєстрації'}: ${text}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};