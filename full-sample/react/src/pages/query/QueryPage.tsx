import { useQuery } from '@tanstack/react-query';

export function QueryPage() {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/repos/TanStack/query'
      );
      return await response.json();
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.full_name}</h1>
      <text>Subscribers: {data.subscribers_count}</text>
      <text>Stargazers: {data.stargazers_count}</text>
      <text>Forks: {data.forks_count}</text>

      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
}
