export interface RequestParams<T> {
  endpoint: string;
  data: T;
}

export const sendAuthRequest = async <T extends FormData | object>({
  endpoint,
  data,
}: RequestParams<T>) => {
  try {
    const response = await fetch(`http://localhost:8081/auth/${endpoint}`, {
      method: "POST",
      headers:
        data instanceof FormData
          ? undefined
          : {
              "Content-Type": "application/json",
            },
      body: data instanceof FormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Помилка при реєстрації: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};