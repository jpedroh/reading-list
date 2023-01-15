'use client'

import { useAtom } from "jotai"
import { ChangeEvent } from "react"
import { tagsAtom } from "../../hooks/use-search-tags"

type Props = {
    availableTags: readonly { name: string, total: number }[]
}

export function TagsFilter({ availableTags }: Props) {
    const [value, setValue] = useAtom(tagsAtom)

    function toggleTag(evt: ChangeEvent<HTMLInputElement>) {
        const tag = evt.target.name;
        if (value.includes(tag)) {
            setValue(value.filter(v => v !== tag))
        } else {
            setValue([...value, tag])
        }
    }

    return <ul className="flex flex-col gap-2">
        {availableTags.map(tag => {
            return (<label key={tag.name} className={`border border-zinc-700 bg-zinc-800 ${value.includes(tag.name) ? '' : 'bg-opacity-30'} hover:bg-opacity-100 transition-all duration-300 rounded-xl flex gap-2 cursor-pointer p-3`}>
                <input type="checkbox" checked={value.includes(tag.name)} onChange={toggleTag} name={tag.name} />
                <span>{tag.name} ({tag.total})</span>
            </label>)
        })}
    </ul>
}