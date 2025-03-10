import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { appRouter } from '../../server/appRouter';

const t = initTRPC.create();

export const createContext = ({}) => ({});

export type Context = inferAsyncReturnType<typeof createContext>;

export default t.router(appRouter);
