import { createRouter } from '@trpc/server';
import { z } from 'zod';

// model
interface Task {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: number;
}
//init
let tasks: Task[] = [];

export const taskRouter = createRouter()
  .mutation('create', {
    input: z.object({
      titulo: z.string().min(1, 'Título é obrigatório'),
      descricao: z.string().optional(),
    }),
    resolve({ input }) {
      const task = {
        id: Date.now().toString(),
        titulo: input.titulo,
        descricao: input.descricao,
        dataCriacao: Date.now(),
      };
      tasks.push(task);
      return task;
    },
  })
  .query('list', {
    resolve() {
      return tasks;
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      titulo: z.string().min(1, 'Título é obrigatório'),
      descricao: z.string().optional(),
    }),
    resolve({ input }) {
      const taskIndex = tasks.findIndex((task) => task.id === input.id);
      if (taskIndex === -1) throw new Error('Tarefa não encontrada');
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        titulo: input.titulo,
        descricao: input.descricao,
      };
      return tasks[taskIndex];
    },
  })
  .mutation('delete', {
    input: z.string(),
    resolve({ input }) {
      tasks = tasks.filter((task) => task.id !== input);
      return { id: input };
    },
  });
