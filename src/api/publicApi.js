export const fetchTasksFromAPI = async () => {
  const response = await fetch(
    'https://6a3d1b2ed8e212699e236d5b.mockapi.io/tasks'
  );

  const data = await response.json();

  return data.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    status: item.status,
    createdDate: new Date(item.createdDate * 1000),
  }));
};
