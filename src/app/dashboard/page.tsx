"use client";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getCats = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.access_token}`,
      },
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button onClick={getCats} className="btn btn-primary">
        Get Cats
      </button>
    </div>
  );
};

export default DashboardPage;
