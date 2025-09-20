
import { HTMLAttributes } from 'react'
import clsx from 'clsx'
export default function Section({ className, ...props }: HTMLAttributes<HTMLDivElement>){
  return <section className={clsx('mx-auto max-w-5xl px-6 py-12 md:py-16', className)} {...props} />
}
