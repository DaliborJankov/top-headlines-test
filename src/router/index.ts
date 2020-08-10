export interface Routes {
  path: string;
  name: string;
  component: React.FC;
  meta?: Record<string, any>;
}

export const routes: Routes[] = [];
