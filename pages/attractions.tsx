import { InferGetServerSidePropsType } from "next";
import { Container,Grid,Card,CardContent,CardMedia,CardActionArea,Typography } from '@mui/material';
import Link from 'next/link';
type Data = {
    id: string,
    name: string,
    coverimage: string,
    detail: string
}

// export const getServerSideProps = async () => {
//     const res = await fetch('http://localhost:3000/api/attractions')
//     const data: Data[] = await res.json()

//     return {
//         props: {
//             data,
//         },
//     }
// }
export const getServerSideProps = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/attractions');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }
        const data: Data[] = await res.json();

        return {
            props: {
                data,
            },
        };
    } catch (error : any) {
        console.error('Error fetching data:', error.message);

        return {
            props: {
                data: [],
            },
        };
    }
};


function Page({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
    return (
        <div>
           <Container maxWidth='sm'>
           <Grid container spacing={2}>
                {data.map(attraction => (
                    
                    <Grid item xs={6} md={4} key={attraction.id}>
                        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <Link href={"/attractions/"+attraction.id}>
        <CardMedia
          component="img"
          height="140"
          image=  {attraction.coverimage} 
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {attraction.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {attraction.detail}
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>
    </Card>
                       
                    </Grid>
                ))}
            </Grid>
           </Container>
        </div>
    )
}
export default Page