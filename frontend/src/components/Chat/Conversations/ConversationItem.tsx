import { Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";

interface IConversationItemProps {
  conversation: ConversationPopulated;
}

const ConversationItem: React.FC<IConversationItemProps> = ({
  conversation,
}) => {
  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.200" }} borderRadius={4}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;