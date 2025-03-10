import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const TarefaPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const createTask = trpc.useMutation('task.create');
  const updateTask = trpc.useMutation('task.update');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateTask.mutateAsync({ id: id as string, titulo, descricao });
    } else {
      await createTask.mutateAsync({ titulo, descricao });
    }
  };

  useEffect(() => {
    if (id) {
 
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'} Tarefa</button>
    </form>
  );
};

export default TarefaPage;
