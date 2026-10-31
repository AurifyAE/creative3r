import type { Metadata } from 'next';
import {
    ContactCard,
    Divider,
    List,
    PolicySectionBlock,
    PolicyShell,
    Prose,
    SubHeading,
    type PolicySection,
} from '@/app/components/legal/PolicyPage';

export const metadata: Metadata = {
    title: 'Data Access and Access Logging Policy | LS (Luxury Shoppe) — 3R Creative',
    description:
        'How access to personal and business information is managed, restricted and logged within LS (Luxury Shoppe) by 3R Creative (F.Z.E.).',
};

const sections: PolicySection[] = [
    { id: 'intro', label: 'Introduction' },
    { id: 'access', label: '2. Access to Information' },
    { id: 'roles', label: '3. Roles & Permissions' },
    { id: 'account-security', label: '4. Account Security' },
    { id: 'logging', label: '5. Monitoring & Logging' },
    { id: 'protection', label: '6. Protecting Information' },
    { id: 'responsibilities', label: '7. Employee Duties' },
    { id: 'updates', label: '8. Policy Updates' },
];

const accessPractices = [
    'Access is provided only to authorised users.',
    'Permissions are assigned based on job responsibilities.',
    'Sensitive customer information is restricted to users who require it.',
    'Access permissions are reviewed periodically.',
    'Unnecessary access is removed when responsibilities change or employment ends.',
];

const permissionTypes = [
    'Viewing information.',
    'Adding new records.',
    'Updating existing records.',
    'Deleting records.',
    'Approving specific activities.',
];

const accountSecurityMeasures = [
    'Password protection for user accounts.',
    'Secure authentication and session management.',
    'Automatic expiration of access sessions.',
    'Restricted access to sensitive information.',
    'Immediate revocation of access when an account is no longer required.',
];

const loggedActivities = [
    'Creation of records.',
    'Updates to existing records.',
    'Deletion of records.',
    'User login and logout activities.',
    'Important system and integration activities.',
];

const protectionPractices = [
    'Protecting sensitive information through encryption.',
    'Restricting access based on user permissions.',
    'Using secure connections for data transmission.',
    'Preventing unauthorised sharing of customer information.',
    'Maintaining separate environments for development and production.',
    'Following appropriate data retention and deletion practices.',
];

const employeeDuties = [
    'Access information only when required for their work.',
    'Keep passwords and account credentials confidential.',
    'Avoid sharing customer information with unauthorised individuals.',
    'Never use real customer information for unauthorised testing or development.',
    'Report suspicious activities or accidental data exposure immediately.',
];

export default function LuxuryShoppeDataAccessLoggingPage() {
    return (
        <PolicyShell
            backHref="/luxury-shoppe"
            backLabel="Back to LS (Luxury Shoppe)"
            eyebrow="Luxury Shoppe · Legal"
            titleTop="Data Access and"
            titleAccent="Access Logging Policy"
            meta={[
                { label: 'Platform', value: 'LS (Luxury Shoppe)' },
                { label: 'Company', value: '3R Creative (F.Z.E.)' },
                { label: 'Last Updated', value: '31 October 2026' },
            ]}
            sections={sections}
        >
            <section id="intro" className="scroll-mt-28">
                <Prose>
                    <p>
                        At <strong className="text-white">3R Creative</strong>, we believe that
                        customer information should be protected and accessible only to authorised
                        individuals.
                    </p>
                    <p>
                        This policy explains how access to personal and business information is
                        managed within <strong className="text-white">LS (Luxury Shoppe)</strong>, how
                        information is protected and how important activities are recorded.
                    </p>
                    <p>
                        Our aim is to ensure that customer information remains secure, private and
                        accessible only when there is a legitimate business requirement.
                    </p>
                </Prose>
            </section>

            <Divider />

            <PolicySectionBlock id="access" number="2" heading="Access to Information">
                <Prose>
                    <p>
                        Access to customer and business information is restricted based on an
                        individual&rsquo;s responsibilities. We follow the principle of providing only
                        the minimum access required to perform assigned tasks.
                    </p>
                </Prose>
                <SubHeading>Our access management practices</SubHeading>
                <List items={accessPractices} />
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="roles" number="3" heading="User Roles and Permissions">
                <Prose>
                    <p>
                        LS (Luxury Shoppe) uses role-based access controls to manage user permissions.
                        Different users may have different levels of access depending on their
                        responsibilities. Access may include:
                    </p>
                </Prose>
                <List items={permissionTypes} />
                <Prose>
                    <p className="mt-4">
                        Access to customer information obtained through{' '}
                        <strong className="text-white">Shopify</strong> is separately restricted and is
                        not automatically available to every user.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="account-security" number="4" heading="Account and Access Security">
                <Prose>
                    <p>
                        We implement appropriate security measures to protect user accounts and prevent
                        unauthorised access. These measures include:
                    </p>
                </Prose>
                <List items={accountSecurityMeasures} />
                <Prose>
                    <p className="mt-4">
                        Users are responsible for keeping their login credentials confidential and must
                        not share their accounts with others.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="logging" number="5" heading="Monitoring and Activity Logging">
                <Prose>
                    <p>
                        We maintain records of important activities performed within the platform to
                        support security, accountability and investigation. These records may include:
                    </p>
                </Prose>
                <List items={loggedActivities} />
                <Prose>
                    <p className="mt-4">
                        These records help us understand important changes made within the platform and
                        identify suspicious activities.
                    </p>
                </Prose>
                <SubHeading>Customer information access</SubHeading>
                <Prose>
                    <p>
                        Currently, the platform records important changes to customer and business
                        records but does not maintain a separate history of every occasion on which an
                        individual customer record is viewed.
                    </p>
                    <p>
                        We recognise the importance of this functionality and plan to improve access
                        monitoring to provide greater visibility into the use of sensitive customer
                        information.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="protection" number="6" heading="Protection of Customer Information">
                <Prose>
                    <p>
                        We take appropriate measures to prevent unauthorised access, disclosure or
                        misuse of customer information. Our practices include:
                    </p>
                </Prose>
                <List items={protectionPractices} />
                <Prose>
                    <p className="mt-4">
                        Customer information must not be copied, shared or stored in unauthorised
                        personal devices or external services.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="responsibilities" number="7" heading="Employee Responsibilities">
                <Prose>
                    <p>
                        All authorised users are expected to handle customer and business information
                        responsibly. Users must:
                    </p>
                </Prose>
                <List items={employeeDuties} />
                <Prose>
                    <p className="mt-4">
                        Any misuse of access privileges may result in appropriate action.
                    </p>
                </Prose>
                <div className="mt-6">
                    <ContactCard label="Report misuse or accidental exposure">
                        info@creative3r.com
                    </ContactCard>
                </div>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="updates" number="8" heading="Policy Updates">
                <Prose>
                    <p>
                        We may periodically review and update this policy to reflect changes in our
                        services, security practices and applicable legal requirements. Any updates to
                        this policy will be published on this page.
                    </p>
                </Prose>
            </PolicySectionBlock>
        </PolicyShell>
    );
}
