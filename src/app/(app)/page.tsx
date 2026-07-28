import { Logo } from "@/components/ui/logo";

export default function HomePage() {
    return (
        <main className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Home
            </h1>
            <p className="text-muted-foreground text-sm">
                Dashboard shell. Raid calendar and widgets will land here later.
            </p>
            <p>Class Colors:</p>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p className="text-class-death-knight">
                                Death Knight
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-demon-hunter">
                                Demon Hunter
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-druid">Druid</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-evoker">Evoker</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-hunter">Hunter</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-mage">Mage</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-monk">Monk</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-paladin">Paladin</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-priest">Priest</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-rogue">Rogue</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-shaman">Shaman</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-warlock">Warlock</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-class-warrior">Warrior</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>Logo:</p>
            <Logo className="text-primary size-10" />
            <Logo className="text-secondary size-50" />
        </main>
    );
}
