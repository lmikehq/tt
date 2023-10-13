"use client";

import { Grid } from "@/components/templates/grid";
import ChatArea from "./components/chatArea";
import ChatSessions from "./components/chatSessions";
import Section from "../section";
import { useState } from "react";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

function AIChat() {
  const [message, setMessage] = useState("");
  const { isMobile } = useScreenResolution();
  return (
    <Section>
      <Grid
        columns=""
        gap="0"
        style={{
          gridTemplateColumns: isMobile ? "1fr" : "1fr 4fr",
        }}
      >
        {!isMobile && <ChatSessions setMessage={setMessage} />}
        <ChatArea setMessage={setMessage} message={message} />
      </Grid>
    </Section>
  );
}

export default AIChat;
