import { authPage } from "../middlewares/user/authPage";

export async function getServerSideProps (context) {
  const { token } = await authPage(context);

  return {
    props: {
      token      
    }
  }
}

export default function Home(props) {
  console.log(props.token);

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-lg">Index</h1>
      
    </div>
  )
}
