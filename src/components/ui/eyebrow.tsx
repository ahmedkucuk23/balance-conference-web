import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "py-1 px-4 text-balance-100 text-sm",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
