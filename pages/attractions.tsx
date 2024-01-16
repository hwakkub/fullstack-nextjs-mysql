import { InferGetServerSidePropsType } from "next";

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
            <ul>
                {data.map(attraction => (
                    <li key={attraction.id}>
                        {attraction.name} {attraction.coverimage} {attraction.detail}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Page