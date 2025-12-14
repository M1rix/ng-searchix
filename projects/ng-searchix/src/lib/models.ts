export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;   // optional icon key (host can render)
  href?: string;   // optional link (host decides how to open/navigate)
  data?: any;      // custom payload
}
