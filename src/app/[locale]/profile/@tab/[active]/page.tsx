import UserInfo from "@/components/profile/userInfo";


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
