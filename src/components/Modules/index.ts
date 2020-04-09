import ControlPanel from './ControlPanel';
import { ModuleType, VisualType } from './type';

const moduleVisualMap = new Map<ModuleType, VisualType[]>([
  // switch
  [ModuleType.SWITCH, [VisualType.SWITCH]],

  // data_entity
  [ModuleType.DATA_ENTITY, [VisualType.TABLE]],
]);

const queryModalVisual = (moduleType: ModuleType) => moduleVisualMap.get(moduleType);

export { ControlPanel, queryModalVisual };
