import type { DemoKind } from "@/lib/kairu";
import { EscuelaDemo } from "./demos/escuela-demo";
import { TerapiqDemo } from "./demos/terapiq-demo";

export function DashboardPreview({
    kind = "escuela",
    interactive = false,
    onOpenFullScreen,
}: {
    kind?: DemoKind;
    interactive?: boolean;
    onOpenFullScreen?: () => void;
}) {
    if (kind === "terapiq") {
        return (
            <TerapiqDemo
                interactive={interactive}
                onOpenFullScreen={onOpenFullScreen}
            />
        );
    }

    return (
        <EscuelaDemo
            interactive={interactive}
            onOpenFullScreen={onOpenFullScreen}
        />
    );
}
