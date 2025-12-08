export const fetchForm = async () => {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/form`);
  if (!response.ok) {
    throw new Error("Failed to fetch form");
  }
  return response.json();
};
