import { Box } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

import { useColorMode } from "@chakra-ui/color-mode";

import { IconButton } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Chat from "../components/Chat/Chat";
import Auth from "../components/Auth/Auth";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  return (
    <Box>
      {session?.user?.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}

      {/* <IconButton mt={4} aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton> */}
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;
