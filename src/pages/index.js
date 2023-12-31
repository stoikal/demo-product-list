export default function Home () {
  return (
    <main />
  )
}

export async function getServerSideProps (ctx) {
  const { cookies } = ctx.req

  const targetPath = cookies.token ? '/products' : '/login'

  return {
    redirect: {
      destination: targetPath,
      permanent: false
    }
  }
}
