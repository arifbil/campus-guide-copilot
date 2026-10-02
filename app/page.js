"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [pendingLetter, setPendingLetter] = useState(null);

/* ===== DATA MAHASISWA AKTIF ===== */

const student = {
  nim: null,
  nama: "Arif",
};

  /* ===== FUNGSI KIRIM PESAN ===== */

  const handleSend = async () => {

    if (input.trim() === "") return;


    const userMessage = {
      role: "user",
      text: input,
    };


    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);


    const currentInput = input;

    setInput("");


    try {

      /* ===== CEK KONFIRMASI SURAT ===== */

      const lowerInput =
        currentInput.toLowerCase().trim();


      const isConfirmation =
        Boolean(
          pendingLetter &&
          (
            lowerInput === "ya" ||
            lowerInput === "iya" ||
            lowerInput === "iyaa" ||
            lowerInput === "ya, simpan" ||
            lowerInput === "iya, simpan" ||
            lowerInput === "setuju" ||
            lowerInput === "simpan"
          )
        );

        console.log("KONFIRMASI SURAT:", {
        lowerInput,
        isConfirmation,
        pendingLetter,
      });


      console.log("DEBUG SURAT SEBELUM FETCH:", {
        currentInput,
        isConfirmation,
        pendingLetter,
      });

      /* ===== REQUEST KE BACKEND ===== */

      const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

                body: JSON.stringify({

            message: currentInput,

            messages: [
              ...messages,
              userMessage,
            ],
            nim: student.nim,
            confirmed: isConfirmation,
            pendingLetter:
              isConfirmation
                ? pendingLetter
                : null,

            }),

          }); 


      const data =
        await response.json();


      /* ===== SIMPAN PENDING LETTER ===== */

      if (
        data.preview === true &&
        data.pendingLetter
      ) {

        setPendingLetter(
          data.pendingLetter
        );

      }


      /* ===== HAPUS PENDING LETTER ===== */

      if (
        isConfirmation &&
        !data.pendingLetter
      ) {

        setPendingLetter(null);

      }


      /* ===== PESAN DARI AI ===== */

      const botMessage = {

        role: "assistant",

        text: data.reply,

      };


      setMessages((currentMessages) => [

        ...currentMessages,

        botMessage,

      ]);


    } catch (error) {

      console.error(
        "Error:",
        error
      );


      const errorMessage = {

        role: "assistant",

        text:
          "Maaf, terjadi kesalahan saat menghubungi server.",

      };


      setMessages((currentMessages) => [

        ...currentMessages,

        errorMessage,

      ]);

    }

  };


  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">


        {/* ===== HEADER ===== */}

        <header className="mb-12 flex items-start justify-between gap-6">


          {/* ===== HEADER TEXT ===== */}

          <div>

            <p className="mb-2 text-sm font-semibold text-blue-600">
              CAMPUS GUIDE COPILOT
            </p>

            <h1 className="text-4xl font-bold text-slate-900">
              Your AI Companion for Campus Life
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Asisten AI untuk membantu mahasiswa menemukan informasi
              akademik, lokasi kampus, dan layanan mahasiswa.
            </p>

          </div>


          {/* ===== LOGO POLITALA ===== */}

          <Image
            src="/logo-politala.png"
            alt="Logo POLITALA"
            width={100}
            height={100}
          />

        </header>


        {/* ===== GREETING & CHAT ===== */}

        <section className="mb-8 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-slate-900">
             👋 Halo, {student.nama}!
          </h2>

          <p className="mt-2 text-slate-600">
            Ada yang bisa saya bantu hari ini?
          </p>


          {/* ===== CHAT MESSAGES ===== */}

          {messages.map((message, index) => (

            <div
              key={index}
              className={`mt-4 rounded-xl p-4 ${
                message.role === "user"
                  ? "ml-auto max-w-[80%] bg-blue-600 text-white"
                  : "mr-auto max-w-[80%] bg-slate-100 text-slate-700"
              }`}
            >

                        <p className="mb-1 text-xs font-semibold opacity-70">
                {message.role === "user"
                  ? student.nama
                  : "Campus Guide Copilot"}
              </p>

              <p>
                {message.text}
              </p>

            </div>

          ))}


          {/* ===== CHAT INPUT ===== */}

          <div className="mt-6 flex gap-3">

            <input
              type="text"
              placeholder="Tanya tentang kampus..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSend}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Tanya
            </button>

          </div>

        </section>


        {/* ===== FITUR ===== */}

        <section>

          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Apa yang bisa saya bantu?
          </h2>


          <div className="grid gap-4 md:grid-cols-3">


            {/* ===== KARTU AKADEMIK ===== */}

            <Link href="/akademik">

              <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg">

                <div className="text-3xl">
                  📚
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Akademik
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Tanya tentang KRS, jadwal, dosen wali, dan prosedur akademik.
                </p>

              </div>

            </Link>


            {/* ===== KARTU NAVIGASI ===== */}

            <Link href="/navigasi">

              <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg">

                <div className="text-3xl">
                  🗺️
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Navigasi Kampus
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Cari ruangan, gedung, fasilitas, dan lokasi layanan kampus.
                </p>

              </div>

            </Link>


            {/* ===== KARTU LAYANAN ===== */}

            <Link href="/layanan">

              <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg">

                <div className="text-3xl">
                  🏢
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Layanan Mahasiswa
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Temukan informasi layanan dan prosedur yang dibutuhkan.
                </p>

              </div>

            </Link>


          </div>

        </section>


      </div>
    </main>
  );

}