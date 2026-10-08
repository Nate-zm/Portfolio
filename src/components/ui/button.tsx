import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
const variants=cva('button',{variants:{variant:{default:'button-primary',outline:'button-outline',ghost:'button-ghost'}},defaultVariants:{variant:'default'}});
export const Button=forwardRef<HTMLButtonElement,ButtonHTMLAttributes<HTMLButtonElement>&VariantProps<typeof variants>>(({className,variant,...props},ref)=><button ref={ref} className={clsx(variants({variant}),className)} {...props}/>);
Button.displayName='Button';
