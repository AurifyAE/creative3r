export const HEAR_OPTIONS = [
  "Social Media",
  "Friends & Colleagues",
  "Word of mouth",
] as const;

export type HearOption = (typeof HEAR_OPTIONS)[number];

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  company: string;
  hearAboutUs: HearOption | "";
  projectDetails: string;
  website: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  phoneCountry?: string;
  company?: string;
  hearAboutUs?: string;
  projectDetails?: string;
  website?: string;
  form?: string;
}

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 32,
  company: 100,
  projectDetails: 2_000,
} as const;

export interface ContactValidationResult {
  data: ContactFormData;
  errors: ContactFormErrors;
  isHoneypot: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasUnsafeControlCharacters(value: string, allowNewlines = false): boolean {
  const controls = allowNewlines
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\u0000-\u001F\u007F]/;
  return controls.test(value);
}

function readString(
  input: Record<string, unknown>,
  key: string,
  errors: ContactFormErrors,
  label: string,
  optional = false
): string {
  const value = input[key];
  if (value === undefined || value === null || value === "") {
    if (!optional) errors[key as keyof ContactFormErrors] = `${label} is required.`;
    return "";
  }
  if (typeof value !== "string") {
    errors[key as keyof ContactFormErrors] = `${label} must be text.`;
    return "";
  }

  const normalized = value.trim();
  if (!optional && !normalized) {
    errors[key as keyof ContactFormErrors] = `${label} is required.`;
  }
  return normalized;
}

export function validateContactForm(input: unknown): ContactValidationResult {
  const errors: ContactFormErrors = {};
  const record = isRecord(input) ? input : {};
  const name = readString(record, "name", errors, "Name");
  const email = readString(record, "email", errors, "Email");
  const phone = readString(record, "phone", errors, "Phone number");
  const phoneCountry = readString(record, "phoneCountry", errors, "Phone country", true);
  const company = readString(record, "company", errors, "Company name", true);
  const hearAboutUs = readString(record, "hearAboutUs", errors, "Referral source", true);
  const projectDetails = readString(record, "projectDetails", errors, "Project details", true);
  const website = readString(record, "website", errors, "Website", true);

  if (!isRecord(input)) {
    errors.form = "Please submit a valid form.";
  }

  if (name) {
    if (name.length < 3) errors.name = "Name must be at least 3 characters.";
    else if (name.length > CONTACT_LIMITS.name) errors.name = `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;
    else if (!/[\p{L}]/u.test(name)) errors.name = "Please enter a valid name.";
    else if (hasUnsafeControlCharacters(name)) errors.name = "Name contains invalid characters.";
  }

  if (email) {
    if (email.length > CONTACT_LIMITS.email) errors.email = "Email is too long.";
    else if (hasUnsafeControlCharacters(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (phone.length > CONTACT_LIMITS.phone || !/^[+]?\d[\d\s().-]*$/.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    } else if (digits.length < 7 || digits.length > 15) {
      errors.phone = "Phone number must contain between 7 and 15 digits.";
    }
    if (!phoneCountry) errors.phoneCountry = "Please select a phone country.";
  }

  if (phoneCountry && !/^[A-Z]{2}$/.test(phoneCountry)) {
    errors.phoneCountry = "Please select a valid phone country.";
  }

  if (company) {
    if (company.length > CONTACT_LIMITS.company) errors.company = `Company name must be ${CONTACT_LIMITS.company} characters or fewer.`;
    else if (hasUnsafeControlCharacters(company)) errors.company = "Company name contains invalid characters.";
  }

  if (hearAboutUs && !HEAR_OPTIONS.includes(hearAboutUs as HearOption)) {
    errors.hearAboutUs = "Please select a valid referral source.";
  }

  if (projectDetails) {
    if (projectDetails.length > CONTACT_LIMITS.projectDetails) {
      errors.projectDetails = `Project details must be ${CONTACT_LIMITS.projectDetails} characters or fewer.`;
    } else if (hasUnsafeControlCharacters(projectDetails, true)) {
      errors.projectDetails = "Project details contain invalid characters.";
    }
  }

  return {
    data: {
      name,
      email,
      phone,
      phoneCountry,
      company,
      hearAboutUs: HEAR_OPTIONS.includes(hearAboutUs as HearOption) ? (hearAboutUs as HearOption) : "",
      projectDetails,
      website,
    },
    errors,
    isHoneypot: Boolean(website),
  };
}

export function hasContactErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
