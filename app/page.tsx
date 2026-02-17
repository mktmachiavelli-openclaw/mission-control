import { ProjectBoard } from '@/components/ProjectBoard';
import { getProjects } from '@/lib/parser';

export default async function Home() {
  const projects = await getProjects();
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mission Control</h1>
          <p className="text-slate-400">Real-time project management & agent coordination</p>
        </header>
        
        <ProjectBoard initialProjects={projects} />
      </div>
    </main>
  );
}
