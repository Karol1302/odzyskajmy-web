export interface Project {
  id: number;
  title: string;
  description: string; // Krótki opis
  content: string; // Pełen opis
  images: string[];
  date: string;
  allowSubscription?: boolean;
  subscriptionLink?: string;
  forceActive?: boolean;
}

const withBase = (p: Project): Project => ({
  ...p,
  images: p.images.map((img) => import.meta.env.BASE_URL + img),
});
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(import.meta.env.BASE_URL + "projects/projects.json");
  const list: { projects: { id: number; path: string }[] } = await res.json();
  const projects = await Promise.all(
    list.projects.map(async (meta) => {
      const r = await fetch(import.meta.env.BASE_URL + meta.path);
      const data: Project = await r.json();
      return withBase(data);
    }),
  );
  return projects;
}
export async function fetchProject(id: number): Promise<Project | undefined> {
  try {
    const r = await fetch(
      import.meta.env.BASE_URL + `projects/${id}/${id}.json`,
    );
    if (!r.ok) return undefined;
    const data: Project = await r.json();
    return withBase(data);
  } catch {
    return undefined;
  }
}