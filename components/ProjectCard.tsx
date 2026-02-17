'use client';

import { useDraggable } from '@dnd-kit/core';
import { Project } from '@/lib/parser';

interface ProjectCardProps {
  project: Project;
  isDragging?: boolean;
}

export function ProjectCard({ project, isDragging = false }: ProjectCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: project.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  async function mentionAgent(agentName: string) {
    try {
      await fetch('/api/mention-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: agentName,
          project: project.name,
          message: `Update needed for ${project.name}`,
        }),
      });
    } catch (error) {
      console.error('Failed to mention agent:', error);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-slate-700 rounded-lg p-4 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-shadow ${
        isDragging ? 'shadow-2xl scale-105' : ''
      }`}
    >
      <h3 className="text-white font-semibold mb-2">{project.name}</h3>

      {project.description && (
        <p className="text-slate-300 text-sm mb-3">{project.description}</p>
      )}

      <div className="space-y-2 text-xs">
        {project.owner && (
          <div className="text-slate-400">
            <span className="font-medium">Owner:</span> {project.owner}
          </div>
        )}

        {project.deadline && (
          <div className="text-slate-400">
            <span className="font-medium">Deadline:</span> {project.deadline}
          </div>
        )}

        {project.nextSteps && project.nextSteps.length > 0 && (
          <div className="mt-3">
            <div className="text-blue-400 font-medium mb-1">Next Steps:</div>
            <ul className="text-slate-300 space-y-1 pl-3">
              {project.nextSteps.slice(0, 3).map((step, i) => (
                <li key={i} className="text-xs">• {step}</li>
              ))}
            </ul>
          </div>
        )}

        {project.blockers && project.blockers.length > 0 && (
          <div className="mt-3">
            <div className="text-red-400 font-medium mb-1">Blockers:</div>
            <ul className="text-slate-300 space-y-1 pl-3">
              {project.blockers.map((blocker, i) => (
                <li key={i} className="text-xs">⚠️ {blocker}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => mentionAgent('Maya')}
          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
        >
          @ Maya
        </button>
        <button
          onClick={() => mentionAgent('DevBoy')}
          className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
        >
          @ DevBoy
        </button>
      </div>
    </div>
  );
}
