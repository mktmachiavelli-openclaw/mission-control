import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface Project {
  id: string;
  name: string;
  status: 'backlog' | 'in-progress' | 'blocked' | 'done';
  owner?: string;
  deadline?: string;
  description?: string;
  nextSteps?: string[];
  blockers?: string[];
  path: string;
}

const WORKSPACE_PATH = '/Users/gustavo/.openclaw/workspace';
const PROJECTS_PATH = path.join(WORKSPACE_PATH, 'memory/projects');

export async function getProjects(): Promise<Project[]> {
  try {
    const files = await fs.readdir(PROJECTS_PATH);
    const projectFiles = files.filter(f => f.endsWith('.md') && !f.startsWith('_'));
    
    const projects = await Promise.all(
      projectFiles.map(async (file) => {
        const filePath = path.join(PROJECTS_PATH, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Parse frontmatter if exists
        const { data, content: body } = matter(content);
        
        // Extract project info from content
        const nameMatch = file.replace('.md', '');
        const statusMatch = body.match(/estado[:\s]+(.+)/i);
        const ownerMatch = body.match(/owner[s]?[:\s]+(.+)/i);
        const deadlineMatch = body.match(/prazo[s]?[:\s]+(.+)/i);
        
        return {
          id: nameMatch,
          name: nameMatch.replace(/-/g, ' '),
          status: inferStatus(body, statusMatch?.[1]),
          owner: ownerMatch?.[1]?.trim(),
          deadline: deadlineMatch?.[1]?.trim(),
          description: extractDescription(body),
          nextSteps: extractNextSteps(body),
          blockers: extractBlockers(body),
          path: filePath,
        };
      })
    );
    
    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

function inferStatus(content: string, stateText?: string): Project['status'] {
  const lower = (stateText || content).toLowerCase();
  
  if (lower.includes('boilerplate completo') || lower.includes('done') || lower.includes('concluído')) {
    return 'done';
  }
  if (lower.includes('bloqueado') || lower.includes('blocked') || lower.includes('travado')) {
    return 'blocked';
  }
  if (lower.includes('em andamento') || lower.includes('in progress') || lower.includes('ativo')) {
    return 'in-progress';
  }
  
  return 'backlog';
}

function extractDescription(content: string): string {
  const lines = content.split('\n');
  const descLine = lines.find(l => l.match(/descrição|description/i));
  return descLine?.replace(/.*[:=]\s*/, '').trim() || '';
}

function extractNextSteps(content: string): string[] {
  const match = content.match(/próximos?[_\s]passos?[:\s]+([\s\S]+?)(?=\n##|$)/i);
  if (!match) return [];
  
  return match[1]
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('-') || l.startsWith('•') || l.match(/^\d+\./))
    .map(l => l.replace(/^[-•\d.]\s*/, ''));
}

function extractBlockers(content: string): string[] {
  const match = content.match(/bloqueador(es)?[:\s]+([\s\S]+?)(?=\n##|$)/i);
  if (!match) return [];
  
  return match[2]
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('-') || l.startsWith('•'))
    .map(l => l.replace(/^[-•]\s*/, ''));
}
