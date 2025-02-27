// File: seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const cves = [
        {
            title: 'CVE-2021-44228',
            description: 'Apache Log4j2 2.0-beta9 through 2.15.0 (excluding security releases) JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled LDAP and other JNDI related endpoints.',
            exploit: 'Exploit involves crafting a malicious payload to trigger remote code execution via JNDI injection.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Apache AND services.software.product: Log4j' },
                { label: 'Shodan', query: 'product:"Apache Log4j" version:"2.14.1"' }
            ],
            patching: 'Upgrade to Log4j 2.16.0 or later. Disable JNDI lookup functionality if possible.',
            severity: 'Critical',
            otherInformation: 'Also known as Log4Shell. Affects Java applications using Log4j for logging.'
        },
        {
            title: 'CVE-2023-23397',
            description: 'Microsoft Outlook allows an attacker to send a specially crafted email message that triggers NTLM authentication, potentially leading to credential theft.',
            exploit: 'Craft a malicious email with a UNC path in the PidLidReminderFileParameter property to force NTLM authentication.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Microsoft AND services.software.product: Outlook' },
                { label: 'Shodan', query: 'product:"Microsoft Outlook"' }
            ],
            patching: 'Apply the March 2023 security update for Microsoft Office. Use Group Policy to disable NTLM fallback.',
            severity: 'High',
            otherInformation: 'Affects Microsoft Outlook versions prior to the March 2023 patch.'
        },
        {
            title: 'CVE-2023-36884',
            description: 'Windows Search Remote Code Execution Vulnerability. An attacker could exploit this vulnerability by sending a specially crafted message to the Windows Search service.',
            exploit: 'Exploit involves crafting a malicious SMB packet to trigger remote code execution on the target system.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Microsoft AND services.software.product: Windows Search' },
                { label: 'Shodan', query: 'product:"Windows Search"' }
            ],
            patching: 'Install the July 2023 security update for Windows. Restrict access to the Windows Search service.',
            severity: 'Critical',
            otherInformation: 'Affects all supported versions of Windows prior to the July 2023 patch.'
        },
        {
            title: 'CVE-2023-46805',
            description: 'VMware ESXi OpenSLP Heap Overflow Vulnerability. An unauthenticated attacker with network access can exploit this vulnerability to execute arbitrary code.',
            exploit: 'Exploit involves sending a malformed packet to the OpenSLP service on port 427.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: VMware AND services.software.product: ESXi' },
                { label: 'Shodan', query: 'product:"VMware ESXi"' }
            ],
            patching: 'Apply the latest VMware ESXi patches. Disable OpenSLP if not required.',
            severity: 'Critical',
            otherInformation: 'Affects VMware ESXi versions prior to the October 2023 patch.'
        },
        {
            title: 'CVE-2023-48795',
            description: 'Linux Kernel Use After Free Vulnerability. An attacker could exploit this vulnerability to gain elevated privileges on the system.',
            exploit: 'Exploit involves triggering a race condition in the kernel to corrupt memory and escalate privileges.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Linux AND services.software.product: Kernel' },
                { label: 'Shodan', query: 'product:"Linux Kernel"' }
            ],
            patching: 'Update the Linux kernel to the latest stable version. Apply mitigations such as SELinux.',
            severity: 'High',
            otherInformation: 'Affects Linux kernel versions prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-46806',
            description: 'VMware Workspace ONE Access Improper Input Validation Vulnerability. An attacker could exploit this vulnerability to execute arbitrary commands.',
            exploit: 'Exploit involves sending a crafted HTTP request to the vulnerable endpoint.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: VMware AND services.software.product: Workspace ONE' },
                { label: 'Shodan', query: 'product:"VMware Workspace ONE"' }
            ],
            patching: 'Apply the latest VMware Workspace ONE patches. Restrict access to administrative interfaces.',
            severity: 'Critical',
            otherInformation: 'Affects VMware Workspace ONE versions prior to the October 2023 patch.'
        },
        {
            title: 'CVE-2023-48831',
            description: 'Adobe Acrobat Reader Arbitrary Code Execution Vulnerability. An attacker could exploit this vulnerability by tricking a user into opening a malicious PDF file.',
            exploit: 'Exploit involves embedding malicious JavaScript in a PDF file to trigger code execution.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Adobe AND services.software.product: Acrobat Reader' },
                { label: 'Shodan', query: 'product:"Adobe Acrobat Reader"' }
            ],
            patching: 'Update Adobe Acrobat Reader to the latest version. Disable JavaScript in PDF files if possible.',
            severity: 'High',
            otherInformation: 'Affects Adobe Acrobat Reader versions prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-4863',
            description: 'Google Chrome Heap Buffer Overflow Vulnerability. An attacker could exploit this vulnerability to execute arbitrary code in the context of the browser.',
            exploit: 'Exploit involves crafting a malicious website to trigger memory corruption.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Google AND services.software.product: Chrome' },
                { label: 'Shodan', query: 'product:"Google Chrome"' }
            ],
            patching: 'Update Google Chrome to the latest version. Enable Site Isolation as a mitigation.',
            severity: 'Critical',
            otherInformation: 'Affects Google Chrome versions prior to the September 2023 patch.'
        },
        {
            title: 'CVE-2023-46807',
            description: 'Fortinet FortiOS Improper Access Control Vulnerability. An attacker could exploit this vulnerability to gain unauthorized access to sensitive information.',
            exploit: 'Exploit involves sending a crafted request to the management interface.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Fortinet AND services.software.product: FortiOS' },
                { label: 'Shodan', query: 'product:"Fortinet FortiOS"' }
            ],
            patching: 'Apply the latest FortiOS patches. Restrict access to the management interface.',
            severity: 'High',
            otherInformation: 'Affects Fortinet FortiOS versions prior to the October 2023 patch.'
        },
        {
            title: 'CVE-2023-48796',
            description: 'Cisco IOS XE Software Authentication Bypass Vulnerability. An attacker could exploit this vulnerability to bypass authentication and gain administrative access.',
            exploit: 'Exploit involves sending a crafted request to the web-based management interface.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Cisco AND services.software.product: IOS XE' },
                { label: 'Shodan', query: 'product:"Cisco IOS XE"' }
            ],
            patching: 'Apply the latest Cisco IOS XE patches. Disable unused services and interfaces.',
            severity: 'Critical',
            otherInformation: 'Affects Cisco IOS XE versions prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-48797',
            description: 'WordPress Plugin SQL Injection Vulnerability. An attacker could exploit this vulnerability to execute arbitrary SQL queries.',
            exploit: 'Exploit involves crafting a malicious HTTP request to the vulnerable plugin endpoint.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: WordPress AND services.software.product: Plugin' },
                { label: 'Shodan', query: 'product:"WordPress Plugin"' }
            ],
            patching: 'Update the affected WordPress plugin to the latest version. Use prepared statements in SQL queries.',
            severity: 'High',
            otherInformation: 'Affects specific WordPress plugins prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-48798',
            description: 'Jenkins Script Security Plugin Sandbox Bypass Vulnerability. An attacker could exploit this vulnerability to execute arbitrary Groovy scripts.',
            exploit: 'Exploit involves crafting a malicious Groovy script to bypass sandbox restrictions.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Jenkins AND services.software.product: Script Security Plugin' },
                { label: 'Shodan', query: 'product:"Jenkins Script Security Plugin"' }
            ],
            patching: 'Update the Jenkins Script Security Plugin to the latest version. Restrict script execution permissions.',
            severity: 'High',
            otherInformation: 'Affects Jenkins Script Security Plugin versions prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-48799',
            description: 'Drupal Core Remote Code Execution Vulnerability. An attacker could exploit this vulnerability to execute arbitrary PHP code.',
            exploit: 'Exploit involves uploading a malicious file to the Drupal core upload endpoint.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Drupal AND services.software.product: Core' },
                { label: 'Shodan', query: 'product:"Drupal Core"' }
            ],
            patching: 'Update Drupal Core to the latest version. Restrict file upload permissions.',
            severity: 'Critical',
            otherInformation: 'Affects Drupal Core versions prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-48800',
            description: 'Apache Tomcat Denial of Service Vulnerability. An attacker could exploit this vulnerability to cause a denial of service condition.',
            exploit: 'Exploit involves sending a large number of requests to exhaust server resources.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: Apache AND services.software.product: Tomcat' },
                { label: 'Shodan', query: 'product:"Apache Tomcat"' }
            ],
            patching: 'Update Apache Tomcat to the latest version. Implement rate limiting and resource monitoring.',
            severity: 'Medium',
            otherInformation: 'Affects Apache Tomcat versions prior to the November 2023 patch.'
        },
        {
            title: 'CVE-2023-48801',
            description: 'OpenSSL Use After Free Vulnerability. An attacker could exploit this vulnerability to cause a crash or execute arbitrary code.',
            exploit: 'Exploit involves triggering a race condition in OpenSSL to corrupt memory.',
            dorkingList: [
                { label: 'Censys', query: 'services.software.vendor: OpenSSL' },
                { label: 'Shodan', query: 'product:"OpenSSL"' }
            ],
            patching: 'Update OpenSSL to the latest version. Apply mitigations such as ASLR and stack canaries.',
            severity: 'High',
            otherInformation: 'Affects OpenSSL versions prior to the November 2023 patch.'
        }
    ];

    for (const cve of cves) {
        await prisma.cve.create({
            data: cve
        });
    }

    console.log('✅ Seed data added successfully');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
