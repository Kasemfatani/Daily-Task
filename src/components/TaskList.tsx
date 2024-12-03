import { useState } from "react";
import { Task } from "@/types/Task";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface TaskListProps {
  tasks: Task[];
  onTasksReorder: (tasks: Task[]) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onToggleComplete: (id: string) => void;
}

const TaskList = ({
  tasks,
  onTasksReorder,
  onDeleteTask,
  onEditTask,
  onToggleComplete,
}: TaskListProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onTasksReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <TransitionGroup>
              {tasks.map((task, index) => (
                <CSSTransition key={task.id} timeout={300} classNames="task">
                  <Draggable draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          onDelete={onDeleteTask}
                          onEdit={onEditTask}
                          onToggleComplete={onToggleComplete}
                        />
                      </div>
                    )}
                  </Draggable>
                </CSSTransition>
              ))}
            </TransitionGroup>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;