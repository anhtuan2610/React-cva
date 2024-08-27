import { cva } from "class-variance-authority";
import { ComponentProps, useMemo } from "react";
import { z, ZodError } from "zod";

type InputProps = ComponentProps<"input"> & {
  scale?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "tertiary";
  validateSchema?: z.ZodSchema;
};

const inputVariants = cva(
  ["font-semibold", "border", "rounded", "py-2", "px-3", "w-full"],
  {
    variants: {
      scale: {
        small: "text-sm py-1 px-2",
        medium: "text-base py-2 px-3",
        large: "text-lg py-3 px-4",
      },
      variant: {
        primary: "border-blue-500",
        secondary: "border-gray-500",
        tertiary: "border-green-500",
      },
    },
    defaultVariants: {
      scale: "medium",
      variant: "primary",
    },
  }
);

export default function Input({
  scale,
  variant,
  validateSchema,
  ...rest
}: InputProps) {
  function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    if (validateSchema) {
      try {
        validateSchema.parse(e.target.value); // nếu không parse được sẽ throw ra lỗi
        console.log("Valid!");
      } catch (err) {
        // có thể là lỗi của chương trình hoặc zod
        if (err instanceof ZodError) {
          //   console.log(err.errors);
          console.log(err.errors?.[0]?.message || "Validation error"); // Đây là mảng lỗi
        }
      }
    }
  }

  const className = useMemo(() => {
    return inputVariants({ scale, variant });
  }, [scale, variant]); // font-semibold border rounded py-2 px-3 text-base py-2 px-3 border-blue-500
  return <input {...rest} className={className} onBlur={handleOnBlur} />;
}
