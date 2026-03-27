"use client";

import { useState } from "react";
import PhoneInput, { PhoneValue } from "../ui/PhoneInput";
import { useHoverSound } from "@/app/hooks/useHoverSound";

type HearOption = "Social Media" | "Friends & Colleagues" | "Word of mouth";
type FormStatus = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  company: string;
  hearAboutUs: HearOption | "";
  projectDetails: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  phoneCountry: "",
  company: "",
  hearAboutUs: "",
  projectDetails: "",
};

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneKey, setPhoneKey] = useState(0);
  const playHoverSound = useHoverSound();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleHear = (label: HearOption) => {
    setForm((prev) => ({
      ...prev,
      hearAboutUs: prev.hearAboutUs === label ? "" : label,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
      setPhoneKey((prev) => prev + 1);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const inputClass =
    "backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30 transition-all duration-200 bg-transparent";

  return (
    <section className="bg-[#1F1E1E] text-white py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-10 px-6 text-center">
        {/* Heading */}
        <div className="text-left space-y-1 md:space-y-2">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-normal uppercase">
            Let&apos;s have a chat
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
            over a coffee
          </p>
        </div>

        {/* Card with Glassy Effect */}
        <div className="w-full rounded-[24px] md:rounded-[32px] bg-white/10 backdrop-blur-xl px-5 py-7 md:px-10 md:py-10 text-left text-white shadow-2xl border border-white/20">
          {/* Intro copy */}
          <div className="space-y-2 mb-6">
            <p className="text-sm md:text-base font-semibold text-[#E76F51]">
              Hi There!
            </p>
            <p className="text-sm md:text-base text-white/90">
              Just fill in a few quick details below – we&apos;ll get back to
              you within one business day. Prefer a conversation? Give us a call
              or email anytime. We&apos;re always up for a coffee and a chat.
            </p>
          </div>

          <p className="mb-4 text-sm md:text-base font-semibold text-[#E76F51]">
            Let&apos;s get started:
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Row 1 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Your Name <span className="text-[#E76F51]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Email <span className="text-[#E76F51]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <PhoneInput
                  label="Phone Number"
                  defaultCountry="AE"
                  placeholder="50 123 4567"
                  preferredCountries={["AE", "SA", "GB", "US", "IN"]}
                  key={phoneKey}
                  onChange={({ fullNumber, country }: PhoneValue) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: fullNumber,
                      phoneCountry: country.code,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Who do you represent?"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* How did you hear about us */}
              <div className="flex flex-col gap-4 pt-1">
                <div>
                  <p className="text-xs md:text-sm font-medium text-white/80">
                    How did you hear about us?
                  </p>
                  <p className="text-[11px] text-white/60">
                    We always love hearing how good people find us!
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(
                    [
                      "Social Media",
                      "Friends & Colleagues",
                      "Word of mouth",
                    ] as HearOption[]
                  ).map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleHear(label)}
                      className={`rounded-full backdrop-blur-sm border px-3 py-1 sm:px-4 sm:py-1 text-[10px] sm:text-xs transition-all duration-200 ${form.hearAboutUs === label
                        ? "bg-[#E76F51] border-[#E76F51] text-white"
                        : "bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-[#E76F51] hover:text-white"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  name="projectDetails"
                  value={form.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell us a little about your brand, your goals, and what you'd like to create together."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-4 pt-4">
              {/* Error banner */}
              {status === "error" && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                onMouseEnter={playHoverSound}
                disabled={status === "loading"}
                className="w-full sm:w-auto self-center sm:self-start inline-flex items-center justify-center rounded-full bg-[#E76F51] px-10 py-4 text-base font-bold text-white shadow-lg hover:bg-[#d45b3f] hover:shadow-xl hover:shadow-[#E76F51]/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Success message */}
              {status === "success" && (
                <div className="mt-4 space-y-2">
                  <p className="text-center text-xl md:text-2xl font-bold text-[#299D8F]">
                    Thanks a ton!
                  </p>
                  <p className="text-center text-xs md:text-sm font-medium text-white/70 max-w-xs mx-auto">
                    We&apos;re thrilled to connect and can&apos;t wait to start
                    working together.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;