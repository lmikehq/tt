"use client";

import { Grid } from "@/components/templates/grid";
import ChatArea from "./components/chatArea";
import ChatSessions from "./components/chatSessions";
import Section from "../section";
import { useState } from "react";

function AIChat() {
   const [message, setMessage] = useState("");
  return (
    <Section >
      <Grid
        columns=""
        gap="0"
        style={{
          gridTemplateColumns: "1fr 4fr",
        }}
      >
        <ChatSessions setMessage={setMessage} />
        <ChatArea setMessage={setMessage} message={message} />
      </Grid>
    </Section>
  );
}

export default AIChat;
