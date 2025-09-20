
import { HTMLAttributes } from 'react'
import clsx from 'clsx'
export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>){
  return <div className={clsx('rounded-2xl border border-[#1e1e2a] bg-[#12121a] p-6', className)} {...props} />
}
