import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7",
      base: "text-base",
      muted: "text-sm text-muted-foreground",
      small: "text-sm font-medium leading-none",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

interface TypographyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, as: Component = "div", ...props }, ref) => {
    return <Component ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />;
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
