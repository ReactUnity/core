import { useQuery } from '@tanstack/react-query';

export function QueryPage() {
  const { isPending, error, data, isFetching, refetch } = useQuery<any>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/TanStack/query');
      return await response.json();
    },
  });

  if (isPending) return <view className={'text-slate-500'}>Loading...</view>;

  if (error) return <view className={'text-red-600'}>An error has occurred: {error.message}</view>;

  return (
    <view>
      <h1>Tanstack Query</h1>

      <view className={'gap-5 self-start rounded-2xl bg-white p-8 ring-1 ring-slate-200'}>
        <view className={'text-2xl font-semibold text-slate-900'}>{data.full_name}</view>

        <view className={'flex-row gap-8'}>
          {[
            { label: 'Subscribers', value: data.subscribers_count },
            { label: 'Stargazers', value: data.stargazers_count },
            { label: 'Forks', value: data.forks_count },
          ].map((stat) => (
            <view key={stat.label} className={'gap-1'}>
              <view className={'text-3xl font-bold text-indigo-600'}>{stat.value?.toString()}</view>
              <view className={'text-xs text-slate-500'}>{stat.label}</view>
            </view>
          ))}
        </view>

        <button
          className={'self-start bg-indigo-500 px-5 py-3 text-white transition-colors hover:bg-indigo-400 disabled:bg-slate-300'}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </view>
    </view>
  );
}
