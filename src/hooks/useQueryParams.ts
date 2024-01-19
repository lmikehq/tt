import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { debounce } from 'debounce'

export const useQueryParams = () => {
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const debouncedSearchTerm = debounce(() => search, 3000)

  // SET THE QUERY PARAMS WHEN THE PAGE LOADS
  useEffect(() => {
    const initialSearchValue = searchParams.get('search')

  }, [])

  // UPDATE THE SEARCH QUERY PARAMS
  useEffect(() => {

  }, [])

  return {
    search,
    setSearch
  }
}