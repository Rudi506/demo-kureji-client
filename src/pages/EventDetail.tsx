import React from "react";
import { useParams } from "react-router";

export const EventDetail = () => {
  const { eventId } = useParams();
  return (
    <>
      <div>{eventId}</div>
    </>
  );
};
