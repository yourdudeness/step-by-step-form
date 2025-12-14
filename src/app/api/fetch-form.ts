export const fetchForm = async () => {
  const response = await fetch(`${process.env.API_URL}/form`);
  if (!response.ok) {
    throw new Error("Failed to fetch form");
  }
  return response.json();
};
