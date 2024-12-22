import { LayoutGrid, Grid2X2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewToggleButtonProps {
  viewMode: "compact" | "detailed"
  onViewModeChange: (mode: "compact" | "detailed") => void
  className?: string
}

export function ViewToggleButton({ viewMode, onViewModeChange, className }: ViewToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={() => onViewModeChange(viewMode === "compact" ? "detailed" : "compact")}
    >
      {viewMode === "compact" ? (
        <Grid2X2 className="h-5 w-5 text-gray-600" />
      ) : (
        <LayoutGrid className="h-5 w-5 text-gray-600" />
      )}
    </Button>
  )
}