"use client";
import React from "react";
import SectionLayout from "@components/templates/SectionLayout";
import RoomList from "@/components/molecules/stays/components/roomList";
import styled from "styled-components";

const Container = styled.div``;
function Page() {
  return (
    <SectionLayout>
      <RoomList />
    </SectionLayout>
  );
}

export default Page;
