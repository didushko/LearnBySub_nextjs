import UserInfo from "@/components/profile/UserInfo";

export default function TestSettingsSlot({
  params,
}: {
  params: { active?: string };
}) {
  return (
    <div>
      <UserInfo page={params.active} />
    </div>
  );
}
