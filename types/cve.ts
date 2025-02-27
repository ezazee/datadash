export interface CVE {
    id: string;
    title: string;
    description: string;
    exploit: string;
    dorking: string;
    patching?: string;
    severity: string;
    otherInformation?: string;
}

export interface SeverityItem {
    severity: string;
}
