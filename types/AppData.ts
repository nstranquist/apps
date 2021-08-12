export interface AppData {
  id: string;
  title: string;
  description: string;
  website: string;
  actions: {
    name: string;
    icon?: string;
    link?: string;
  }
  // version: string;
}