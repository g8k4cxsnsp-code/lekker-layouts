import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SITE_CONFIG } from "@/lib/constants";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: March 2026
            </p>

            <div className="mt-12 space-y-10 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  1. Services
                </h2>
                <p className="mt-3">
                  Lekker Layouts provides website templates, custom web
                  development services, and ongoing maintenance packages. All
                  services are described on our website and in any written
                  agreement or quotation provided to you prior to purchase.
                </p>
                <p className="mt-3">
                  We reserve the right to update or modify our service offerings
                  at any time. Any changes will not affect orders already
                  confirmed and paid for.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  2. Payment
                </h2>
                <p className="mt-3">
                  All prices are listed in South African Rand (ZAR) and are
                  inclusive of VAT where applicable. Payment is required before
                  work commences on any project or before template files are
                  delivered.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Template purchases require full payment upfront.</li>
                  <li>Custom projects may require a 50% deposit, with the balance due upon completion.</li>
                  <li>Monthly maintenance packages are billed at the start of each billing cycle.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  3. Delivery
                </h2>
                <p className="mt-3">
                  Digital products are delivered via Canva template links
                  sent to your email once payment has been confirmed. Custom projects
                  are delivered according to the timeline agreed upon in the
                  project scope.
                </p>
                <p className="mt-3">
                  While we aim to meet all estimated timelines, delivery dates
                  are not guaranteed and may be affected by the complexity of the
                  project or delays in receiving client content and feedback.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  4. Intellectual Property
                </h2>
                <p className="mt-3">
                  Upon full payment, you receive a licence to use the purchased
                  template or completed website for your business. This licence
                  is non-exclusive and non-transferable.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>You may not resell, redistribute, or sublicense any template or code purchased from Lekker Layouts.</li>
                  <li>The underlying code, design patterns, and frameworks remain the intellectual property of Lekker Layouts.</li>
                  <li>You retain ownership of all content (text, images, logos) that you provide for your website.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  5. Limitation of Liability
                </h2>
                <p className="mt-3">
                  Lekker Layouts provides all services and products on an
                  &quot;as is&quot; basis. We do our best to ensure quality and
                  reliability, but we cannot guarantee that our templates or
                  services will be error-free or uninterrupted.
                </p>
                <p className="mt-3">
                  To the maximum extent permitted by South African law, Lekker
                  Layouts shall not be liable for any indirect, incidental, or
                  consequential damages arising from the use of our products or
                  services.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  6. Refunds
                </h2>
                <p className="mt-3">
                  Due to the digital nature of our products, refunds on template
                  purchases are generally not offered once the template files
                  have been delivered.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>If a template has a verified defect that we cannot resolve, a full refund will be provided.</li>
                  <li>Custom project refunds are handled on a case-by-case basis, depending on the stage of completion.</li>
                  <li>Monthly maintenance subscriptions can be cancelled at any time with 30 days&apos; notice.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  7. Governing Law
                </h2>
                <p className="mt-3">
                  These terms are governed by the laws of the Republic of South
                  Africa. Any disputes arising from these terms shall be subject
                  to the jurisdiction of the South African courts.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  8. Contact
                </h2>
                <p className="mt-3">
                  If you have any questions about these terms, please contact us
                  at:
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
