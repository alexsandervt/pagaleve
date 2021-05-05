export default function Home(props){
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.users)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/users')
  const data = await response.json()

  return {
    props: {
      users: data,
    },
    revalidate: 60 * 60 * 8
  }
}