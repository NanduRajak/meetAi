"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success!");
        },
      }
    );
  };

  const onSubmit = () => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success!");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col gap-4">
        <p>logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}> signOut</Button>
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col gap-y-4 justify-center ">
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create</Button>
      </div>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onLogin}>Login</Button>
    </div>
  );
}
