
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary', size?: 'sm'|'md'|'lg' }
export default function Button({ className, variant='primary', size='md', ...props }: Props){
  const base = 'rounded-xl font-semibold transition active:translate-y-px'
  const v = variant === 'secondary'
    ? 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
    : 'text-white bg-slate-900 hover:bg-slate-800'
  const s = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'
  return <button className={clsx(base, v, s, className)} {...props} />
}
