export const fetcher = async ({ url, method, body, json = true }: any) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  if (json) {
    return data;
  }
};
