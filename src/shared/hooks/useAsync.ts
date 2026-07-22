/* eslint-disable react-hooks/use-memo */
import { useCallback, useEffect, useState } from 'react'

export function useAsync<T>(loader: () => Promise<T>, dependencies: readonly unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try { setData(await loader()) }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Unable to load data.') }
    finally { setLoading(false) }
  // The caller controls reload inputs through dependencies.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  useEffect(() => { void reload() }, [reload])
  return { data, setData, loading, error, reload }
}
