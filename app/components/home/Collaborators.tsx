    import Image from "next/image";

    const collaborators = [
    { name: "Blue Diamond Jewellery", src: "assets/images/home/companies/bluediamond.svg" },
    { name: "Promise Gold Refinery", src: "assets/images/home/companies/promise.svg" },
    { name: "MAC & RO Capital FZC", src: "assets/images/home/companies/mac&ro.svg" },
    { name: "Dera Diamonds", src: "assets/images/home/companies/dyra.svg" },
    { name: "Siramamba Gold Refinery", src: "assets/images/home/companies/siramamba.svg" },

    { name: "Fogeesh Jewelry", src: "assets/images/home/companies/faqeesh.svg" },
    { name: "Kiora Gold & Diamonds", src: "assets/images/home/companies/kiora.svg" },
    { name: "Crown Gold & Diamonds", src: "assets/images/home/companies/crown.svg" },
    { name: "GDM", src: "assets/images/home/companies/gdm.svg" },
    //   { name: "Signature Jewellery LLC", src: "assets/images/home/companies/signature.svg" },

    { name: "Suntech", src: "assets/images/home/companies/suntech.svg" },
    { name: "FXG Gold", src: "assets/images/home/companies/fxg.svg" },
    { name: "Aibak Gold & Diamonds", src: "assets/images/home/companies/aibak.svg" },
    { name: "Arista Gold", src: "assets/images/home/companies/aristagold.svg" },
    { name: "Black Mamba Real Estate", src: "assets/images/home/companies/blackmamba.svg" },

    { name: "Ramla Style Italia", src: "assets/images/home/companies/ramla.svg" },
    ];

    export default function CollaboratorsSection() {
    return (
        <section className="bg-[#1F1E1E] py-24 px-6">
        <div className="mx-auto max-w-6xl">
            {/* Title */}
            <div className="flex justify-center italic uppercase">
                <h2 className="mb-16 text-4xl tracking-wide text-white">
                Our
                <span className="mt-2 block text-4xl font-semibold">
                    Collaborators
                </span>
                </h2>
            </div>

            {/* Logos Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {collaborators.map((logo) => (
                <div
                key={logo.name}
                className="flex items-center justify-center opacity-80 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
                >
                <Image
                    src={logo.src}
                    alt={logo.name}
                    width={160}
                    height={80}
                    className="max-h-18 w-auto object-contain grayscale-100"
                />
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }
