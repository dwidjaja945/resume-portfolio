const fetchAdapter = <T>(endpoint: string, options: any): Promise<T> =>
  fetch(endpoint, options)
    .then((resp) => resp.json());

export default fetchAdapter;
