import type { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type TypographyVariant =
  | 'headline-1'
  | 'headline-2'
  | 'headline-3'
  | 'headline-4'
  | 'p'
  | 'blockquote'
  | 'list'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

type TextDecoration = 'underline' | 'stroke' | 'italic';

export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'p';

interface TypographyProps<T extends TypographyTag> {
  variant?: TypographyVariant;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  strong?: boolean;
  td?: TextDecoration;
  tag?: T;
}

const classes = {
  'headline-1': 'scroll-m-20  text-4xl font-extrabold tracking-tight text-balance',
  'headline-2': 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  'headline-3': 'scroll-m-20 text-2xl font-semibold tracking-tight',
  'headline-4': 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'text-[16px]',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  list: 'my-6 ml-6 list-disc [&>li]:mt-2',
  lead: 'text-muted-foreground text-xl',
  large: 'text-lg font-semibold',
  small: 'text-sm leading-none font-medium',
  muted: 'text-muted-foreground text-sm',
};

export const Typography = <T extends TypographyTag>({
  children,
  className,
  style,
  td,
  strong,
  tag: Tag,
  variant = 'p',
}: TypographyProps<T>) => {
  const TagToRender = Tag || 'p';

  return (
    <TagToRender
      className={twMerge(`${classes[variant]}`, strong && 'strong', td && `${td}`, className)}
      style={style}
    >
      {children}
    </TagToRender>
  );
};
