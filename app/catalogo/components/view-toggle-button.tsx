import { LayoutGrid, Grid2X2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewToggleButtonProps {
  viewMode?: "compact" | "detailed";
  onViewModeChange?: (mode: "compact" | "detailed") => void;
  isGridView?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function ViewToggleButton({ 
  viewMode, 
  onViewModeChange,
  isGridView,
  onToggle,
  className 
}: ViewToggleButtonProps) {
  const handleClick = () => {
    if (onViewModeChange) {
      onViewModeChange(viewMode === "compact" ? "detailed" : "compact")
    } else if (onToggle) {
      onToggle()
    }
  }

  const isGrid = isGridView ?? viewMode === "compact"

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={handleClick}
    >
      {isGrid ? (
        <Grid2X2 className="h-5 w-5 text-gray-600" />
      ) : (
        <LayoutGrid className="h-5 w-5 text-gray-600" />
      )}
    </Button>
  )
}