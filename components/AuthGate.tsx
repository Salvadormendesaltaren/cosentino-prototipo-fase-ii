"use client";

import { useState, useEffect, FormEvent } from "react";
import basePath from "@/lib/basePath";

const EXPECTED_HASH = "7077f59ed29f86bccb6de309de54851cd94a88adc342f59dd9e6677445074c90";
const AUTH_KEY = "proto-auth";

async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
    setChecking(false);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const hash = await sha256(`${user}:${pass}`);
    if (hash === EXPECTED_HASH) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
    }
    setSubmitting(false);
  }

  if (checking) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[360px] px-[24px] flex flex-col items-center gap-[24px]">
        <img
          src={`${basePath}/images/logo.svg`}
          alt="Cosentino"
          className="h-[14px] w-auto invert mb-[8px]"
        />

        <input
          type="text"
          placeholder="Usuario"
          autoComplete="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full h-[44px] px-[16px] text-[14px] text-black bg-transparent border border-black/15 rounded-[6px] outline-none focus:border-black/40 transition-colors"
          style={{ letterSpacing: "-0.28px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full h-[44px] px-[16px] text-[14px] text-black bg-transparent border border-black/15 rounded-[6px] outline-none focus:border-black/40 transition-colors"
          style={{ letterSpacing: "-0.28px" }}
        />

        {error && (
          <p className="text-[13px] text-red-500/80" style={{ marginTop: "-12px" }}>
            Credenciales incorrectas
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !user || !pass}
          className="w-full h-[44px] bg-black text-white text-[14px] font-normal rounded-[6px] cursor-pointer disabled:opacity-30 disabled:cursor-default transition-opacity"
        >
          Acceder
        </button>
      </form>
    </div>
  );
}
