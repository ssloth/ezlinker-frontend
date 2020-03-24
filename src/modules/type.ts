export interface BaseModule {
  name: string;
  description: string;
}

export interface BaseGroupModule extends BaseModule {
  count: number;
}

export interface SwtichModuleTemplate extends BaseModule {}
