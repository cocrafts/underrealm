import { inspect } from 'util';

import { ecs } from './templates/v1';

console.log(inspect(ecs.toJSON(), { depth: 10, breakLength: 100 }));
