'use client';

import { useDroppable } from '@dnd-kit/core';
import { Project } from '@/lib/parser';
import { ProjectCard } from './ProjectCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  projects: Project[];
}

export function KanbanColumn({ id, title, color, projects }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-lg overflow-hidden transition-colors ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className={`${color} px-4 py-3`}>
        <h2 className="text-white font-semibold text-sm uppercase tracking-wide">
          {title}
          <span className="ml-2 text-xs opacity-75">({projects.length})</span>
        </h2>
      </div>

      <div className="flex-1 bg-slate-800/50 p-3 space-y-3 min-h-[200px]">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
        
        {projects.length === 0 && (
          <div className="text-slate-500 text-sm text-center py-8">
            No projects
          </div>
        )}
      </div>
    </div>
  );
}
