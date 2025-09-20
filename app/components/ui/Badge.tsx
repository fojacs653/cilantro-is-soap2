
import { HTMLAttributes } from 'react'
import clsx from 'clsx'
export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>){
  return <span className={clsx('inline-block rounded-full border border-[#2b2b3a] bg-[#1e1e2a] px-3 py-1 text-xs text-[#9aa0aa]', className)} {...props} />
}
