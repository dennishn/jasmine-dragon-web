import { getCurrentUser } from "@/features/user/user-queries";
import { Unauthorized } from "@/lib/auth/unauthorized";
import { AttendanceShell } from "./shell";

export default async function AttendancePage() {
    const { data: user } = await getCurrentUser();

    if (!user?.player.isOfficer) {
        return <Unauthorized pageTitle="Attendance (Officer Only)" />;
    }

    return (
        <AttendanceShell>
            <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="text-2xl font-bold">Attendance</h1>
            </div>
        </AttendanceShell>
    );
}
