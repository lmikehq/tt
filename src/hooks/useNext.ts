'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { constructParamsFromQuery } from '@/lib/extensions/helpers/constructQuery';

export function useQueryParams<T>(replace: boolean = false) {
    const router = useRouter();
    const pathname = usePathname();
    const searchString = useSearchParams().toString();
    const parsedSearch = useMemo(() => constructParamsFromQuery(searchString) ?? {}, [searchString] )
    
    const urlSearchParams = new URLSearchParams(searchString);

    const setQueryParams = (params: Partial<T>) => {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                urlSearchParams.delete(key);
            } else {
                urlSearchParams.set(key, String(value));
            }
        })

        const search = urlSearchParams.toString();
        const query = search ? `?${search}` : '';

        if (replace) {
            router.replace(`${pathname}${query}`);
        } else {
            router.push(`${pathname}${query}`);
        }
    }

  return { queryParams: parsedSearch, setQueryParams };
}