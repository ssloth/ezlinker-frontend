import { } from '@/typings/global'

export interface IControlPanel {
  id: number;
  pages: IPage[];
}

export interface IPage {
  name: string;
  visuals: IVisual[];
}

export interface IVisual {
  id: string;
  moduleId: string;
  content: any;
}

export class ControlPanel implements IControlPanel {
  public id: number;

  public pages: IPage[];

  constructor(id: number, pages: IPage[]) {
    this.id = id;
    this.pages = pages || [];
  }

  public addPage(name: string) {
    if (this.pages.some(item => item.name === name)) {
      return;
    }
    this.pages.push({
      name,
      visuals: [],
    });
  }

  private addVisual(visual: Visual, pageName: string) {
    const page = this.pages.find(item => item.name === pageName);
    if (!page) return;
    if (page.visuals.some(item => item.id === visual.id)) return;
    page.visuals.push(visual);
  }

  private removeVisual(visual: Visual, pageName: string) {
    const page = this.pages.find(item => item.name === pageName);
    if (!page) return;
    const index = page.visuals.findIndex(item => item.id === visual.id);
    page.visuals.splice(index, 1);
  }

  public render() {}
}
