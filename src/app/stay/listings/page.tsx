"use client";
import React from "react";
import SectionLayout from "@components/templates/SectionLayout";
import RoomList from "@/components/molecules/stays/components/roomList";

function Page() {
    return (
        <SectionLayout>
            <RoomList />
        </SectionLayout>
    );
}

export default Page;
