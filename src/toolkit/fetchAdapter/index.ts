const fetchAdapter = <T>(endpoint: string, options: any): Promise<T> =>
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
    .then((resp) => resp.json());

export default fetchAdapter;
