import { useState } from "react";
import { Task } from "@/types/Task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskList from "@/components/TaskList";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const getCurrentDate = () => {
    return format(new Date(), "EEEE, MMMM do, yyyy");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      content: newTask,
      completed: false,
      createdAt: new Date(),
      timestamp: format(new Date(), "h:mm a"),
    };

    setTasks([...tasks, task]);
    setNewTask("");
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
      variant: "destructive",
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, content: editingTask.content } : task
      )
    );
    setEditingTask(null);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Daily Tasks
          </h1>
          <p className="text-muted-foreground">{getCurrentDate()}</p>
        </div>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>

        <TaskList
          tasks={tasks}
          onTasksReorder={setTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onToggleComplete={handleToggleComplete}
        />

        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <Input
              value={editingTask?.content || ""}
              onChange={(e) =>
                setEditingTask(
                  editingTask
                    ? { ...editingTask, content: e.target.value }
                    : null
                )
              }
              className="my-4"
            />
            <DialogFooter>
              <Button onClick={handleUpdateTask}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;