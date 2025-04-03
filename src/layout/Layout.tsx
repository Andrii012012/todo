import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="container mx-auto px-4 max-w-8xl">
            
            {children}
        </div>
    )
}