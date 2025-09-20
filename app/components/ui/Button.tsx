
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary', size?: 'sm'|'md'|'lg' }
export default function Button({ className, variant='primary', size='md', ...props }: Props){
  const base = 'rounded-xl font-semibold transition active:translate-y-px'
  const v = variant === 'secondary'
    ? 'bg-[#1e1e2a] text-[#eaeaf2] border border-[#2b2b3a] hover:border-[#3b3b4a]'
    : 'bg-[#ff7a1a] text-black hover:brightness-95'
  const s = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'
  return <button className={clsx(base, v, s, className)} {...props} />
}
