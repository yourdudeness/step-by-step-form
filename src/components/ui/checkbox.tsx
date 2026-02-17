import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import styles from "./checkbox.module.css";

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  label?: string;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ label, ...props }, ref) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <CheckboxPrimitive.Root ref={ref} className={styles.Root} {...props}>
      <CheckboxPrimitive.Indicator className={styles.Indicator}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <label className={styles.Label} htmlFor={props.id}>
      {label}
    </label>
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
