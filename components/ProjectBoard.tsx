'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Project } from '@/lib/parser';
import { KanbanColumn } from './KanbanColumn';
import { ProjectCard } from './ProjectCard';

interface ProjectBoardProps {
  initialProjects: Project[];
}

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-slate-700' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-700' },
  { id: 'blocked', title: 'Blocked', color: 'bg-red-700' },
  { id: 'done', title: 'Done', color: 'bg-green-700' },
] as const;

export function ProjectBoard({ initialProjects }: ProjectBoardProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const project = projects.find(p => p.id === event.active.id);
    setActiveProject(project || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;

    const projectId = active.id as string;
    const newStatus = over.id as Project['status'];

    setProjects(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, status: newStatus } : p
      )
    );

    setActiveProject(null);

    // TODO: Persist status change to file
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            projects={projects.filter(p => p.status === column.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeProject ? (
          <div className="opacity-80">
            <ProjectCard project={activeProject} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
