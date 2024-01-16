import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container,Grid,Card,CardContent,CardMedia,CardActionArea,Typography } from '@mui/material';
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
         <div>
           <Container maxWidth='sm'>
           <Grid container spacing={2}>
             
                    
                    <Grid item xs={12} key={data.id}>
                        <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image=  {data.coverimage} 
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {data.detail}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                       
                    </Grid>
                
            </Grid>
           </Container>
        </div>
    </div>
  );
};

export default Page;
