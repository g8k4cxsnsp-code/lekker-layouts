import { notFound } from "next/navigation";
import { templates } from "@/data/templates";
import { TemplateDetailContent } from "./template-detail-content";

export function generateStaticParams() {
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetailContent template={template} />;
}
