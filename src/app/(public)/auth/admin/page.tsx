import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
import { AdminSignInForm } from "@/features/admin-user/components/admin-sign-in-form";
import { RedirectIfAuthenticated } from "@/lib/auth/redirect-if-authenticated";

const AdminLoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Suspense>
                <RedirectIfAuthenticated />
            </Suspense>
            <div className="w-full max-w-3xl flex items-center gap-16">
                <div className="mb-6 flex flex-col items-center justify-center flex-1">
                    <Logo className="size-75" />
                    <h1 className="text-3xl font-bold">Jasmine Dragon</h1>
                </div>
                <div className="flex-1">
                    <Suspense>
                        <AdminSignInForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
