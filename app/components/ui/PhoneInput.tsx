"use client";

import { useState, useRef, useEffect, useCallback, forwardRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Country {
    code: string;
    name: string;
    dialCode: string;
}

export interface PhoneValue {
    country: Country;
    number: string;
    fullNumber: string;
}

export interface PhoneInputProps {
    value?: string;
    defaultCountry?: string;
    onChange?: (value: PhoneValue) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    name?: string;
    id?: string;
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    preferredCountries?: string[];
    excludeCountries?: string[];
    onlyCountries?: string[];
    className?: string;
    style?: React.CSSProperties;
}

// ─── Flag Image via flagcdn.com ───────────────────────────────────────────────

export function FlagImage({
    code,
    size = 20,
    className = "",
}: {
    code: string;
    size?: number;
    className?: string;
}) {
    const lower = code.toLowerCase();
    if (!lower) return null;
    return (
        <img
            src={`https://flagcdn.com/w${size}/${lower}.png`}
            srcSet={`https://flagcdn.com/w${size * 2}/${lower}.png 2x`}
            width={size}
            height={Math.round(size * 0.75)}
            alt={code}
            className={`inline-block object-cover rounded-[2px] ${className}`}
            loading="lazy"
            onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
            }}
        />
    );
}

// ─── All Countries ────────────────────────────────────────────────────────────

export const ALL_COUNTRIES: Country[] = [
    { code: "AF", name: "Afghanistan", dialCode: "+93" },
    { code: "AL", name: "Albania", dialCode: "+355" },
    { code: "DZ", name: "Algeria", dialCode: "+213" },
    { code: "AD", name: "Andorra", dialCode: "+376" },
    { code: "AO", name: "Angola", dialCode: "+244" },
    { code: "AG", name: "Antigua and Barbuda", dialCode: "+1-268" },
    { code: "AR", name: "Argentina", dialCode: "+54" },
    { code: "AM", name: "Armenia", dialCode: "+374" },
    { code: "AW", name: "Aruba", dialCode: "+297" },
    { code: "AU", name: "Australia", dialCode: "+61" },
    { code: "AT", name: "Austria", dialCode: "+43" },
    { code: "AZ", name: "Azerbaijan", dialCode: "+994" },
    { code: "BS", name: "Bahamas", dialCode: "+1-242" },
    { code: "BH", name: "Bahrain", dialCode: "+973" },
    { code: "BD", name: "Bangladesh", dialCode: "+880" },
    { code: "BB", name: "Barbados", dialCode: "+1-246" },
    { code: "BY", name: "Belarus", dialCode: "+375" },
    { code: "BE", name: "Belgium", dialCode: "+32" },
    { code: "BZ", name: "Belize", dialCode: "+501" },
    { code: "BJ", name: "Benin", dialCode: "+229" },
    { code: "BM", name: "Bermuda", dialCode: "+1-441" },
    { code: "BT", name: "Bhutan", dialCode: "+975" },
    { code: "BO", name: "Bolivia", dialCode: "+591" },
    { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387" },
    { code: "BW", name: "Botswana", dialCode: "+267" },
    { code: "BR", name: "Brazil", dialCode: "+55" },
    { code: "IO", name: "British Indian Ocean Territory", dialCode: "+246" },
    { code: "VG", name: "British Virgin Islands", dialCode: "+1-284" },
    { code: "BN", name: "Brunei", dialCode: "+673" },
    { code: "BG", name: "Bulgaria", dialCode: "+359" },
    { code: "BF", name: "Burkina Faso", dialCode: "+226" },
    { code: "BI", name: "Burundi", dialCode: "+257" },
    { code: "KH", name: "Cambodia", dialCode: "+855" },
    { code: "CM", name: "Cameroon", dialCode: "+237" },
    { code: "CA", name: "Canada", dialCode: "+1" },
    { code: "CV", name: "Cape Verde", dialCode: "+238" },
    { code: "KY", name: "Cayman Islands", dialCode: "+1-345" },
    { code: "CF", name: "Central African Republic", dialCode: "+236" },
    { code: "TD", name: "Chad", dialCode: "+235" },
    { code: "CL", name: "Chile", dialCode: "+56" },
    { code: "CN", name: "China", dialCode: "+86" },
    { code: "CX", name: "Christmas Island", dialCode: "+61" },
    { code: "CC", name: "Cocos Islands", dialCode: "+61" },
    { code: "CO", name: "Colombia", dialCode: "+57" },
    { code: "KM", name: "Comoros", dialCode: "+269" },
    { code: "CK", name: "Cook Islands", dialCode: "+682" },
    { code: "CR", name: "Costa Rica", dialCode: "+506" },
    { code: "CI", name: "Côte d'Ivoire", dialCode: "+225" },
    { code: "HR", name: "Croatia", dialCode: "+385" },
    { code: "CU", name: "Cuba", dialCode: "+53" },
    { code: "CW", name: "Curaçao", dialCode: "+599" },
    { code: "CY", name: "Cyprus", dialCode: "+357" },
    { code: "CZ", name: "Czech Republic", dialCode: "+420" },
    { code: "CD", name: "DR Congo", dialCode: "+243" },
    { code: "DK", name: "Denmark", dialCode: "+45" },
    { code: "DJ", name: "Djibouti", dialCode: "+253" },
    { code: "DM", name: "Dominica", dialCode: "+1-767" },
    { code: "DO", name: "Dominican Republic", dialCode: "+1-809" },
    { code: "EC", name: "Ecuador", dialCode: "+593" },
    { code: "EG", name: "Egypt", dialCode: "+20" },
    { code: "SV", name: "El Salvador", dialCode: "+503" },
    { code: "GQ", name: "Equatorial Guinea", dialCode: "+240" },
    { code: "ER", name: "Eritrea", dialCode: "+291" },
    { code: "EE", name: "Estonia", dialCode: "+372" },
    { code: "SZ", name: "Eswatini", dialCode: "+268" },
    { code: "ET", name: "Ethiopia", dialCode: "+251" },
    { code: "FK", name: "Falkland Islands", dialCode: "+500" },
    { code: "FO", name: "Faroe Islands", dialCode: "+298" },
    { code: "FJ", name: "Fiji", dialCode: "+679" },
    { code: "FI", name: "Finland", dialCode: "+358" },
    { code: "FR", name: "France", dialCode: "+33" },
    { code: "GF", name: "French Guiana", dialCode: "+594" },
    { code: "PF", name: "French Polynesia", dialCode: "+689" },
    { code: "GA", name: "Gabon", dialCode: "+241" },
    { code: "GM", name: "Gambia", dialCode: "+220" },
    { code: "GE", name: "Georgia", dialCode: "+995" },
    { code: "DE", name: "Germany", dialCode: "+49" },
    { code: "GH", name: "Ghana", dialCode: "+233" },
    { code: "GI", name: "Gibraltar", dialCode: "+350" },
    { code: "GR", name: "Greece", dialCode: "+30" },
    { code: "GL", name: "Greenland", dialCode: "+299" },
    { code: "GD", name: "Grenada", dialCode: "+1-473" },
    { code: "GP", name: "Guadeloupe", dialCode: "+590" },
    { code: "GU", name: "Guam", dialCode: "+1-671" },
    { code: "GT", name: "Guatemala", dialCode: "+502" },
    { code: "GG", name: "Guernsey", dialCode: "+44-1481" },
    { code: "GN", name: "Guinea", dialCode: "+224" },
    { code: "GW", name: "Guinea-Bissau", dialCode: "+245" },
    { code: "GY", name: "Guyana", dialCode: "+592" },
    { code: "HT", name: "Haiti", dialCode: "+509" },
    { code: "HN", name: "Honduras", dialCode: "+504" },
    { code: "HK", name: "Hong Kong", dialCode: "+852" },
    { code: "HU", name: "Hungary", dialCode: "+36" },
    { code: "IS", name: "Iceland", dialCode: "+354" },
    { code: "IN", name: "India", dialCode: "+91" },
    { code: "ID", name: "Indonesia", dialCode: "+62" },
    { code: "IR", name: "Iran", dialCode: "+98" },
    { code: "IQ", name: "Iraq", dialCode: "+964" },
    { code: "IE", name: "Ireland", dialCode: "+353" },
    { code: "IM", name: "Isle of Man", dialCode: "+44-1624" },
    { code: "IL", name: "Israel", dialCode: "+972" },
    { code: "IT", name: "Italy", dialCode: "+39" },
    { code: "JM", name: "Jamaica", dialCode: "+1-876" },
    { code: "JP", name: "Japan", dialCode: "+81" },
    { code: "JE", name: "Jersey", dialCode: "+44-1534" },
    { code: "JO", name: "Jordan", dialCode: "+962" },
    { code: "KZ", name: "Kazakhstan", dialCode: "+7" },
    { code: "KE", name: "Kenya", dialCode: "+254" },
    { code: "KI", name: "Kiribati", dialCode: "+686" },
    { code: "XK", name: "Kosovo", dialCode: "+383" },
    { code: "KW", name: "Kuwait", dialCode: "+965" },
    { code: "KG", name: "Kyrgyzstan", dialCode: "+996" },
    { code: "LA", name: "Laos", dialCode: "+856" },
    { code: "LV", name: "Latvia", dialCode: "+371" },
    { code: "LB", name: "Lebanon", dialCode: "+961" },
    { code: "LS", name: "Lesotho", dialCode: "+266" },
    { code: "LR", name: "Liberia", dialCode: "+231" },
    { code: "LY", name: "Libya", dialCode: "+218" },
    { code: "LI", name: "Liechtenstein", dialCode: "+423" },
    { code: "LT", name: "Lithuania", dialCode: "+370" },
    { code: "LU", name: "Luxembourg", dialCode: "+352" },
    { code: "MO", name: "Macau", dialCode: "+853" },
    { code: "MG", name: "Madagascar", dialCode: "+261" },
    { code: "MW", name: "Malawi", dialCode: "+265" },
    { code: "MY", name: "Malaysia", dialCode: "+60" },
    { code: "MV", name: "Maldives", dialCode: "+960" },
    { code: "ML", name: "Mali", dialCode: "+223" },
    { code: "MT", name: "Malta", dialCode: "+356" },
    { code: "MH", name: "Marshall Islands", dialCode: "+692" },
    { code: "MQ", name: "Martinique", dialCode: "+596" },
    { code: "MR", name: "Mauritania", dialCode: "+222" },
    { code: "MU", name: "Mauritius", dialCode: "+230" },
    { code: "YT", name: "Mayotte", dialCode: "+262" },
    { code: "MX", name: "Mexico", dialCode: "+52" },
    { code: "FM", name: "Micronesia", dialCode: "+691" },
    { code: "MD", name: "Moldova", dialCode: "+373" },
    { code: "MC", name: "Monaco", dialCode: "+377" },
    { code: "MN", name: "Mongolia", dialCode: "+976" },
    { code: "ME", name: "Montenegro", dialCode: "+382" },
    { code: "MS", name: "Montserrat", dialCode: "+1-664" },
    { code: "MA", name: "Morocco", dialCode: "+212" },
    { code: "MZ", name: "Mozambique", dialCode: "+258" },
    { code: "MM", name: "Myanmar", dialCode: "+95" },
    { code: "NA", name: "Namibia", dialCode: "+264" },
    { code: "NR", name: "Nauru", dialCode: "+674" },
    { code: "NP", name: "Nepal", dialCode: "+977" },
    { code: "NL", name: "Netherlands", dialCode: "+31" },
    { code: "NC", name: "New Caledonia", dialCode: "+687" },
    { code: "NZ", name: "New Zealand", dialCode: "+64" },
    { code: "NI", name: "Nicaragua", dialCode: "+505" },
    { code: "NE", name: "Niger", dialCode: "+227" },
    { code: "NG", name: "Nigeria", dialCode: "+234" },
    { code: "NU", name: "Niue", dialCode: "+683" },
    { code: "NF", name: "Norfolk Island", dialCode: "+672" },
    { code: "KP", name: "North Korea", dialCode: "+850" },
    { code: "MK", name: "North Macedonia", dialCode: "+389" },
    { code: "MP", name: "Northern Mariana Islands", dialCode: "+1-670" },
    { code: "NO", name: "Norway", dialCode: "+47" },
    { code: "OM", name: "Oman", dialCode: "+968" },
    { code: "PK", name: "Pakistan", dialCode: "+92" },
    { code: "PW", name: "Palau", dialCode: "+680" },
    { code: "PS", name: "Palestine", dialCode: "+970" },
    { code: "PA", name: "Panama", dialCode: "+507" },
    { code: "PG", name: "Papua New Guinea", dialCode: "+675" },
    { code: "PY", name: "Paraguay", dialCode: "+595" },
    { code: "PE", name: "Peru", dialCode: "+51" },
    { code: "PH", name: "Philippines", dialCode: "+63" },
    { code: "PL", name: "Poland", dialCode: "+48" },
    { code: "PT", name: "Portugal", dialCode: "+351" },
    { code: "PR", name: "Puerto Rico", dialCode: "+1-787" },
    { code: "QA", name: "Qatar", dialCode: "+974" },
    { code: "CG", name: "Republic of the Congo", dialCode: "+242" },
    { code: "RE", name: "Réunion", dialCode: "+262" },
    { code: "RO", name: "Romania", dialCode: "+40" },
    { code: "RU", name: "Russia", dialCode: "+7" },
    { code: "RW", name: "Rwanda", dialCode: "+250" },
    { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1-869" },
    { code: "LC", name: "Saint Lucia", dialCode: "+1-758" },
    { code: "PM", name: "Saint Pierre and Miquelon", dialCode: "+508" },
    { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1-784" },
    { code: "WS", name: "Samoa", dialCode: "+685" },
    { code: "SM", name: "San Marino", dialCode: "+378" },
    { code: "ST", name: "São Tomé and Príncipe", dialCode: "+239" },
    { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
    { code: "SN", name: "Senegal", dialCode: "+221" },
    { code: "RS", name: "Serbia", dialCode: "+381" },
    { code: "SC", name: "Seychelles", dialCode: "+248" },
    { code: "SL", name: "Sierra Leone", dialCode: "+232" },
    { code: "SG", name: "Singapore", dialCode: "+65" },
    { code: "SX", name: "Sint Maarten", dialCode: "+1-721" },
    { code: "SK", name: "Slovakia", dialCode: "+421" },
    { code: "SI", name: "Slovenia", dialCode: "+386" },
    { code: "SB", name: "Solomon Islands", dialCode: "+677" },
    { code: "SO", name: "Somalia", dialCode: "+252" },
    { code: "ZA", name: "South Africa", dialCode: "+27" },
    { code: "KR", name: "South Korea", dialCode: "+82" },
    { code: "SS", name: "South Sudan", dialCode: "+211" },
    { code: "ES", name: "Spain", dialCode: "+34" },
    { code: "LK", name: "Sri Lanka", dialCode: "+94" },
    { code: "SH", name: "Saint Helena", dialCode: "+290" },
    { code: "SD", name: "Sudan", dialCode: "+249" },
    { code: "SR", name: "Suriname", dialCode: "+597" },
    { code: "SE", name: "Sweden", dialCode: "+46" },
    { code: "CH", name: "Switzerland", dialCode: "+41" },
    { code: "SY", name: "Syria", dialCode: "+963" },
    { code: "TW", name: "Taiwan", dialCode: "+886" },
    { code: "TJ", name: "Tajikistan", dialCode: "+992" },
    { code: "TZ", name: "Tanzania", dialCode: "+255" },
    { code: "TH", name: "Thailand", dialCode: "+66" },
    { code: "TL", name: "Timor-Leste", dialCode: "+670" },
    { code: "TG", name: "Togo", dialCode: "+228" },
    { code: "TK", name: "Tokelau", dialCode: "+690" },
    { code: "TO", name: "Tonga", dialCode: "+676" },
    { code: "TT", name: "Trinidad and Tobago", dialCode: "+1-868" },
    { code: "TN", name: "Tunisia", dialCode: "+216" },
    { code: "TR", name: "Turkey", dialCode: "+90" },
    { code: "TM", name: "Turkmenistan", dialCode: "+993" },
    { code: "TC", name: "Turks and Caicos Islands", dialCode: "+1-649" },
    { code: "TV", name: "Tuvalu", dialCode: "+688" },
    { code: "UG", name: "Uganda", dialCode: "+256" },
    { code: "UA", name: "Ukraine", dialCode: "+380" },
    { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
    { code: "GB", name: "United Kingdom", dialCode: "+44" },
    { code: "US", name: "United States", dialCode: "+1" },
    { code: "VI", name: "U.S. Virgin Islands", dialCode: "+1-340" },
    { code: "AS", name: "American Samoa", dialCode: "+1-684" },
    { code: "UY", name: "Uruguay", dialCode: "+598" },
    { code: "UZ", name: "Uzbekistan", dialCode: "+998" },
    { code: "VU", name: "Vanuatu", dialCode: "+678" },
    { code: "VA", name: "Vatican City", dialCode: "+39-06" },
    { code: "VE", name: "Venezuela", dialCode: "+58" },
    { code: "VN", name: "Vietnam", dialCode: "+84" },
    { code: "WF", name: "Wallis and Futuna", dialCode: "+681" },
    { code: "EH", name: "Western Sahara", dialCode: "+212" },
    { code: "YE", name: "Yemen", dialCode: "+967" },
    { code: "ZM", name: "Zambia", dialCode: "+260" },
    { code: "ZW", name: "Zimbabwe", dialCode: "+263" },
    { code: "HK", name: "Hong Kong SAR", dialCode: "+852" },
    { code: "MO", name: "Macau SAR", dialCode: "+853" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCountryList(
    preferred?: string[],
    exclude?: string[],
    only?: string[]
): Country[] {
    const seen = new Set<string>();
    let list = ALL_COUNTRIES.filter((c) => {
        if (seen.has(c.code)) return false;
        seen.add(c.code);
        return true;
    });
    if (only?.length) list = list.filter((c) => only.includes(c.code));
    else if (exclude?.length) list = list.filter((c) => !exclude.includes(c.code));
    if (preferred?.length) {
        const pinned = preferred
            .map((code) => list.find((c) => c.code === code))
            .filter(Boolean) as Country[];
        const rest = list.filter((c) => !preferred.includes(c.code));
        list = [...pinned, ...rest];
    }
    return list;
}

// ─── Component ────────────────────────────────────────────────────────────────

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    (
        {
            value = "",
            defaultCountry = "US",
            onChange,
            placeholder = "Enter phone number",
            disabled = false,
            readOnly = false,
            autoFocus = false,
            name,
            id,
            label,
            error,
            hint,
            required,
            preferredCountries,
            excludeCountries,
            onlyCountries,
            className = "",
            style,
        },
        ref
    ) => {
        const countryList = buildCountryList(preferredCountries, excludeCountries, onlyCountries);
        const defaultC = countryList.find((c) => c.code === defaultCountry) ?? countryList[0];

        const [selected, setSelected] = useState<Country>(defaultC);
        const [number, setNumber] = useState(value);
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState("");
        const [focused, setFocused] = useState(false);
        const listRef = useRef<HTMLDivElement>(null);

        const wrapperRef = useRef<HTMLDivElement>(null);
        const searchRef = useRef<HTMLInputElement>(null);
        const inputId = id ?? (label ? `phi-${label.replace(/\s+/g, "-").toLowerCase()}` : "phi");

        const filtered = countryList.filter(
            (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.dialCode.includes(search) ||
                c.code.toLowerCase().includes(search.toLowerCase())
        );

        const handleOutside = useCallback((e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        }, []);

        const handleWheel = (e: React.WheelEvent) => {
            if (listRef.current) {
                listRef.current.scrollTop += e.deltaY;
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleOutside);
            return () => document.removeEventListener("mousedown", handleOutside);
        }, [handleOutside]);

        useEffect(() => {
            if (open) setTimeout(() => searchRef.current?.focus(), 50);
        }, [open]);

        const handleSelect = (country: Country) => {
            setSelected(country);
            setOpen(false);
            setSearch("");
            onChange?.({ country, number, fullNumber: `${country.dialCode}${number}` });
        };

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^\d\s\-().+]/g, "");
            setNumber(raw);
            onChange?.({ country: selected, number: raw, fullNumber: `${selected.dialCode}${raw}` });
        };

        // Matches ContactSection inputClass exactly:
        // backdrop-blur-sm border-b border-white/20 rounded-xl px-4 py-2 text-sm text-white
        // placeholder:text-white/40 outline-none hover:bg-white/10 hover:border-white/30
        // focus:bg-white/10 focus:border-[#E76F51] focus:ring focus:ring-[#E76F51]/30
        // transition-all duration-200 bg-transparent
        const fieldClass = [
            "backdrop-blur-sm",
            "bg-transparent",
            "border-b border-white/20",
            "rounded-xl",
            "transition-all duration-200",
            focused || open
                ? "bg-white/10 border-[#E76F51] ring ring-[#E76F51]/30"
                : "hover:bg-white/10 hover:border-white/30",
            disabled ? "opacity-50 pointer-events-none" : "",
        ].join(" ");

        return (
            <div className={`flex flex-col gap-1 w-full ${className}`} style={style}>

                {/* Label — matches ContactSection label style */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-xs md:text-sm font-medium text-white/80"
                    >
                        {label}
                        {required && <span className="text-[#E76F51] ml-0.5">*</span>}
                    </label>
                )}

                {/* Field wrapper */}
                <div ref={wrapperRef} className={`relative flex items-stretch ${fieldClass} ${open ? "z-50" : ""}`}>

                    {/* ── Country trigger ── */}
                    <button
                        type="button"
                        onClick={() => !disabled && !readOnly && setOpen((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={open}
                        aria-label={`Country: ${selected.name} (${selected.dialCode})`}
                        className="
                            flex items-center gap-2 pl-4 pr-3 py-2
                            bg-transparent border-none outline-none cursor-pointer
                            border-r border-white/20
                            hover:bg-white/5
                            transition-colors duration-150
                            shrink-0
                        "
                    >
                        <FlagImage code={selected.code} size={20} />
                        <span className="text-sm text-white font-medium tracking-tight">
                            {selected.dialCode}
                        </span>
                        <svg
                            className={`w-3 h-3 shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    {/* ── Phone number input ── */}
                    <input
                        ref={ref}
                        id={inputId}
                        name={name}
                        type="tel"
                        value={number}
                        onChange={handleNumberChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoFocus={autoFocus}
                        autoComplete="tel"
                        aria-invalid={!!error}
                        aria-required={required}
                        aria-describedby={
                            [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
                                .filter(Boolean).join(" ") || undefined
                        }
                        className="
                            flex-1 min-w-0 bg-transparent
                            px-3 py-2
                            text-sm text-white
                            placeholder:text-white/40
                            outline-none
                        "
                    />

                    {/* ── Dropdown ── */}
                    {open && (
                        <div
                            role="listbox"
                            aria-label="Select country"
                            className="
                                absolute top-[calc(100%+8px)] left-0 w-72 z-50
                                bg-[#2a2a2a] backdrop-blur-xl
                                rounded-2xl border border-white/10
                                shadow-2xl shadow-black/40
                                overflow-hidden
                            "
                            style={{ animation: "phoneDropIn 0.15s cubic-bezier(0.16,1,0.3,1)" }}
                        >
                            <style>{`
                                @keyframes phoneDropIn {
                                    from { opacity: 0; transform: translateY(-6px) scale(0.98); }
                                    to   { opacity: 1; transform: translateY(0) scale(1); }
                                }
                            `}</style>

                            {/* Search */}
                            <div className="p-2 border-b border-white/10">
                                <div className="
                                    flex items-center gap-2 px-3 py-2 rounded-xl
                                    bg-white/5 border border-white/10
                                    focus-within:border-[#E76F51]/60
                                    focus-within:bg-white/10
                                    transition-colors duration-150
                                ">
                                    <svg
                                        className="w-3.5 h-3.5 shrink-0 text-white/30"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="Search country or code…"
                                        className="
                                            flex-1 bg-transparent outline-none
                                            text-[13px] text-white
                                            placeholder:text-white/30
                                        "
                                    />
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => setSearch("")}
                                            className="text-white/30 hover:text-white/60 transition-colors p-0.5"
                                        >
                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Country list */}
                            <div
                                ref={listRef}
                                onWheel={handleWheel}
                                className="max-h-56 overflow-y-auto overscroll-contain p-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
                                {filtered.length === 0 ? (
                                    <p className="py-5 text-center text-[13px] text-white/30">
                                        No countries found
                                    </p>
                                ) : (
                                    filtered.map((country) => {
                                        const isActive = selected.code === country.code;
                                        return (
                                            <button
                                                key={`${country.code}-${country.dialCode}`}
                                                type="button"
                                                role="option"
                                                aria-selected={isActive}
                                                onClick={() => handleSelect(country)}
                                                className={`
                                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                                    text-left transition-colors duration-150 cursor-pointer
                                                    outline-none
                                                    ${isActive
                                                        ? "bg-[#E76F51] text-white"
                                                        : "hover:bg-white/10 text-white/90"
                                                    }
                                                `}
                                            >
                                                <FlagImage code={country.code} size={20} className="shrink-0" />
                                                <span className={`flex-1 text-[13px] font-medium truncate ${isActive ? "text-white" : "text-white/90"}`}>
                                                    {country.name}
                                                </span>
                                                <span className={`font-mono text-[11px] shrink-0 ${isActive ? "text-white/80" : "text-white/40"}`}>
                                                    {country.dialCode}
                                                </span>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Hint */}
                {hint && !error && (
                    <p id={`${inputId}-hint`} className="text-[11px] text-white/50 pl-1">
                        {hint}
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p
                        id={`${inputId}-error`}
                        role="alert"
                        className="flex items-center gap-1.5 text-[11px] font-medium text-red-400 pl-1"
                    >
                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

PhoneInput.displayName = "PhoneInput";
export default PhoneInput;