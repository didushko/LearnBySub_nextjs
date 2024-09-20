import { Suspense } from "react";
import { profileStructure } from "../profilePages";
import { notFound } from 'next/navigation';

export default function profile({ params }: { params: { active: string } }) {
  if (!profileStructure[params.active]){
    notFound();
  }
  const Component = profileStructure[params.active].component;
  const SuspenseComponent = profileStructure[params.active].suspense;
 return <Suspense fallback={SuspenseComponent()}><Component/></Suspense>;
}
