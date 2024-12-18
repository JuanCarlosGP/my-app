import { LayoutGrid, Grid2X2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleButtonProps {
  isGridView: boolean
  onToggle: () => void
}

export function ViewToggleButton({ isGridView, onToggle }: ViewToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={onToggle}
    >
      {isGridView ? (
        <Grid2X2 className="h-5 w-5 text-gray-600" />
      ) : (
        <LayoutGrid className="h-5 w-5 text-gray-600" />
      )}
    </Button>
  )
} 