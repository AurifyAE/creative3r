const ContactSection = () => {
  return (
    <section className="bg-[#1F1E1E] text-white py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-10 px-6 text-center">
        {/* Heading */}
        <div className="text-left space-y-2">
          <p className="text-3xl md:text-4xl font-bold tracking-normal uppercase">
            Let's have a chat
          </p>
          <p className="text-3xl md:text-4xl font-bold uppercase">
            over a coffee
          </p>
        </div>

        {/* Card with Glassy Effect */}
        <div className="w-full rounded-[32px] bg-white/10 backdrop-blur-xl px-6 py-8 text-left text-white shadow-2xl border border-white/20 md:px-10 md:py-10">
          {/* Intro copy */}
          <div className="space-y-2 mb-6">
            <p className="text-sm md:text-base font-semibold text-[#E76F51]">
              Hi There!
            </p>
            <p className="text-sm md:text-base text-white/90">
              Just fill in a few quick details below – we&apos;ll get back to you within one business day.
              Prefer a conversation? Give us a call or email anytime. We're always up for a coffee and a chat.
            </p>
          </div>

          <p className="mb-4 text-sm md:text-base font-semibold text-[#E76F51]">
            Let&apos;s get started:
          </p>

          {/* Form */}
          <form className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="What should we call you?"
                  className="backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+971..."
                  className="backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs md:text-sm font-medium text-white/80">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Who do you represent?"
                  className="backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
             {/* How did you hear about us */}
             <div className="flex flex-col gap-5 pt-1">
              <div>
                <p className="text-xs md:text-sm font-medium text-white/80">
                  How did you hear about us?
                </p>
                <p className="text-[11px] text-white/60">
                  We always love hearing how good people find us!
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Social Media", "Friends & Colleagues", "Word of mouth"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1 text-xs text-white/90 hover:bg-white/20 hover:border-[#E76F51] hover:text-white transition-all duration-200"
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
                rows={3}
                placeholder="Tell us a little about your brand, your goals, and what you'd like to create together."
                className="backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30 focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30 transition-all duration-200 resize-none"
              />
            </div>
            </div>
            

            

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#E76F51] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#d45b3f] hover:shadow-xl hover:shadow-[#E76F51]/20 transition-all duration-200"
              >
                Send Message
              </button>

              <p className="text-center text-2xl font-semibold text-[#299D8F]">
                Thanks a ton!
              </p>
              <p className="text-center text-xs font-semibold text-white/80">
                We&apos;re thrilled to connect and can&apos;t wait to start working together.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;