export const getProfile = async (token: string) => {
  const response = await fetch("http://localhost:8081/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
 if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server error: ${response.status} ${errorText}`);
  }

  const data = await response.json(); // ✅ тільки один 
  return data;
}
