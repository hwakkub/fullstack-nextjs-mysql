import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Data = {
  id: string;
  name: string;
  coverimage: string;
  detail: string;
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Data>({
    id: '',
    name: '',
    coverimage: '',
    detail: '',
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/attractions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setLoading(false);
        });
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.coverimage}</p>
      <p>{data.detail}</p>
    </div>
  );
};

export default Page;
