import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

type CommonProps = {
  variant?: Variant
  /** md = Button (44px), sm = Button S (36px) */
  size?: Size
  trailingArrow?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type ButtonProps = ButtonAsLink | ButtonAsButton

const base =
  'group inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none ' +
  'transition-[background-color,box-shadow,color] duration-200 ease-out ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[14px]',
  sm: 'h-9 px-3 text-[13px]',
}

// Mirrors the Button / Button S variants of the design system.
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-action hover:bg-primary-hover active:bg-primary-pressed active:shadow-none',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-subtle active:bg-pressed',
  ghost: 'text-ink-secondary hover:bg-brand-wash hover:text-ink active:bg-brand-soft',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', trailingArrow = false, className = '', children, ...rest } = props
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const content = (
    <>
      {children}
      {trailingArrow && (
        <ArrowRight
          aria-hidden
          size={20}
          strokeWidth={2}
          className="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
        />
      )}
    </>
  )

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
