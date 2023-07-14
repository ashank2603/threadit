"use client"

import { useQuery } from '@tanstack/react-query'
import { Command, CommandGroup, CommandInput, CommandItem } from './ui/Command'
import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { Prisma, Subreddit } from '@prisma/client'
import { CommandEmpty, CommandList } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'
import debounce from 'lodash.debounce'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const SearchBar = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()
  const commandRef = useRef<HTMLDivElement>(null)

  const { data: queryResults, refetch, isFetched, isFetching } = useQuery({
    queryFn: async () => {
        if(!input) return []
        const { data } = await axios.get(`/api/search?q=${input}`)
        return data as (Subreddit & {
            _count: Prisma.SubredditCountOutputType
        })[]
    },
    queryKey: ['search-query'],
    enabled: false
  })  

  const request = debounce(() => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()  
  }, [])

  useOnClickOutside(commandRef, () => {
    setInput('')
  })

  return (
    <Command ref={commandRef} className='relative rounded-lg border max-w-lg z-50 overflow-visible'>
        <CommandInput 
            value={input}
            onValueChange={(text) => {
                setInput(text)
                debounceRequest()
            }}
            className='outline-none border-none focus:border-none focus:outline-none ring-0' 
            placeholder='Search Communities...'
        />
        {input.length > 0 ? (
            <CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
                {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
                {(queryResults?.length ?? 0) > 0 ? (
                    <CommandGroup heading='Communities'>
                        {queryResults?.map((subreddit) => (
                            <CommandItem
                                onSelect={(e) => {
                                    router.push(`/r/${e}`)
                                    router.refresh()
                                }}
                                key={subreddit.id}
                                value={subreddit.name}
                            >
                                <Users className='mr-2 h-4 w-4' />
                                <a href={`/r/${subreddit.name}`}>
                                    r/{subreddit.name}
                                </a>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ) : null}
            </CommandList>
        ) : null}
    </Command>
  )
}

export default SearchBar