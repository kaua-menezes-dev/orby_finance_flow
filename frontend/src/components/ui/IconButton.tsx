import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accessible name — icon buttons have no visible label. */
  label: string
  ref?: Ref<HTMLButtonElement>
  children: ReactNode
}

/** Icon Button / Secondary (40px) from the design system. */
export function IconButton({ label, children, className = '', ref, ...rest }: IconButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-ink ' +
        'transition-colors duration-200 hover:bg-subtle active:bg-pressed ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  )
}
