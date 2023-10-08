"use client";

import { Grid } from "@/components/templates/grid";
import ChatArea from "./components/chatArea";
import ChatSessions from "./components/chatSessions";
import Section from "../section";

function AIChat() {
  return (
    <Section >
      <Grid
        columns=""
        gap="0"
        style={{
          gridTemplateColumns: "1fr 4fr",
        }}
      >
        <ChatSessions />
        <ChatArea />
      </Grid>
    </Section>
  );
}

export default AIChat;
