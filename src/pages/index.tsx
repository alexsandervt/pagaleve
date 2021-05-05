export default function Home(props) {
  return <h1>Teste</h1>;
}

export async function getSaticProps(){
  const response = await fetch("http://localhost:3333/users")
  const data = await response.json()

  return {
    props: {
      users: data,
    },
    revalidate: 60 * 60 *8,
  }
}