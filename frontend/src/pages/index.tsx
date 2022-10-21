import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      {data?.user ? (
        <button onClick={() => signOut()}>sign out</button>
      ) : (
        <button onClick={() => signIn("google")}>sign in</button>
      )}

      {data?.user?.name}
    </div>
  );
};

export default Home;