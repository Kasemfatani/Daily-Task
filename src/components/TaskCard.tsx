import { Task } from "@/types/Task";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (id: string) => void;
}

const TaskCard = ({ task, onDelete, onEdit, onToggleComplete }: TaskCardProps) => {
  return (
    <Card className="p-4 mb-3 cursor-move hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
          />
          <div className="flex-1">
            <span
              className={cn(
                "block",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.content}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {task.timestamp}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;