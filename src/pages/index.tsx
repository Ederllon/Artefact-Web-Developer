import { GetServerSideProps } from 'next';
import { trpc } from '../utils/trpc';

const Home = ({ tasks }: { tasks: any[] }) => {
  const deleteTask = trpc.useMutation('task.delete');

  const handleDelete = async (id: string) => {
    try {
      await deleteTask.mutateAsync(id);
      alert('Tarefa excluída com sucesso');
    } catch (error) {
      alert('Erro ao excluir a tarefa');
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.titulo} 
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await trpc.fetchQuery('task.list');
  return {
    props: {
      tasks,
    },
  };
};

export default Home;
