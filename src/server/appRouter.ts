import { createRouter } from '@trpc/server';
import { taskRouter } from './taskRouter';

export const appRouter = createRouter().merge('task.', taskRouter);
