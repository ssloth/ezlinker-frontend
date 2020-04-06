export interface ILayout {
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
