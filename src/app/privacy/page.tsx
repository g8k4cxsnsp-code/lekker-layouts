import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SITE_CONFIG } from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: March 2026
            </p>

            <div className="mt-12 space-y-10 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  1. Information We Collect
                </h2>
                <p className="mt-3">
                  When you interact with Lekker Layouts, we may collect the
                  following information:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-foreground">
                      Personal information:
                    </strong>{" "}
                    Name, email address, phone number, and business name when you
                    contact us or submit a form.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Usage information:
                    </strong>{" "}
                    Pages visited, time spent on the site, browser type, and
                    device information collected through analytics.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Communication data:
                    </strong>{" "}
                    Messages sent via our contact form, email, or WhatsApp.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  2. How We Use Your Information
                </h2>
                <p className="mt-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>To respond to your enquiries and provide customer support.</li>
                  <li>To deliver the services or products you have requested.</li>
                  <li>To improve our website, templates, and overall service offering.</li>
                  <li>To send you updates or marketing communications, only with your consent.</li>
                  <li>To comply with legal obligations under South African law.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  3. Data Protection
                </h2>
                <p className="mt-3">
                  We take the security of your personal information seriously and
                  implement appropriate technical and organisational measures to
                  protect it. In line with the Protection of Personal Information
                  Act (POPIA), we ensure that:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Your data is stored securely and only accessible to authorised personnel.</li>
                  <li>We do not sell, rent, or share your personal information with third parties for marketing purposes.</li>
                  <li>Data is retained only for as long as necessary to fulfil the purposes for which it was collected.</li>
                  <li>You have the right to request access to, correction of, or deletion of your personal information at any time.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  4. Cookies
                </h2>
                <p className="mt-3">
                  Our website may use cookies and similar technologies to
                  enhance your browsing experience and analyse site traffic. You
                  can manage your cookie preferences through your browser
                  settings at any time.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  5. Third-Party Services
                </h2>
                <p className="mt-3">
                  We may use third-party services such as analytics providers
                  and hosting platforms. These services have their own privacy
                  policies, and we encourage you to review them. We only work
                  with providers that maintain adequate data protection
                  standards.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  6. Contact Us
                </h2>
                <p className="mt-3">
                  If you have any questions about this privacy policy or wish to
                  exercise your data protection rights, please contact us at:
                </p>
                <p className="mt-3">
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
