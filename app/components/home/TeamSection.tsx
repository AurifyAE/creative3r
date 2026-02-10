import Link from "next/link";

const TeamSection = () => {
  return (
    <section className="bg-[#1F1E1E] text-white py-16 md:py-24 z-1">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-start md:px-8 lg:px-0">
        {/* Left label */}
        <div className="flex flex-col md:w-1/3 p-10">
          <div className="flex items-center justify-end gap-10">
            <div className="text-right md:text-left">
              <h1 className="text-2xl font-medium tracking-[0.3em] uppercase text-neutral-300 text-right">
                The
              </h1>
              <h1 className="mt-1 text-5xl italic font-semibold">
                TEAM
              </h1>
            </div>
            <div className="h-64 w-3 rounded-full bg-[#E76F51]" />
          </div>
        </div>

        {/* Right content */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-[2.7rem] font-semibold leading-tight">
            Reflect. Refine. Resonate.
          </h2>

          <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
            At 3R Creative, we specialise exclusively in the precious metals, jewellery,
            gold refinery, and gold trading industries—empowering brands across the UAE
            and Middle East with strategic creativity that drives real business results.
          </p>

          <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
            Born from the belief that every brand holds a story worth refining, we work
            closely with each client to understand who they are, what their story is,
            and where they want to go. Through deep industry insight and collaborative
            workshops, we uncover the essence of your brand and transform it into
            magnetic visuals, compelling storytelling, and result-oriented digital
            strategies.
          </p>

          <Link href="/teams">
            <button
            className="mt-4 inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-sm font-medium tracking-wide transition hover:border-white hover:bg-white hover:text-black cursor-pointer"
          >
                Know More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

