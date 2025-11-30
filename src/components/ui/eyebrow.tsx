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
          "border border-balance-200/30 py-1 px-4 rounded-lg text-balance-100 text-sm",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
