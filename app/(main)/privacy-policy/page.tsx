import { redirect } from 'next/navigation';

// Legacy privacy policy archived in ./page.legacy.tsx
// Replaced by LS Connect privacy policy at /ls-connect/privacy-policy

export default function PrivacyPolicyRedirect() {
    redirect('/ls-connect/privacy-policy');
}
