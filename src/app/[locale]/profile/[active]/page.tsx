import { Suspense } from "react";
import { profileStructure } from "../profilePagesList";
import { notFound } from "next/navigation";

export default function profile({ params }: { params: { active: string } }) {
  if (!profileStructure[params.active]) {
    notFound();
  }
  const Component = profileStructure[params.active].component;
  const SuspenseComponent = profileStructure[params.active].suspense;
  return (
    <Suspense key={params.toString()} fallback={SuspenseComponent()}>
      <Component />
    </Suspense>
  );
}
