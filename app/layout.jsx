import './globals.css';
import { DoctorAuthProvider } from '../context/DoctorAuthContext';
import { PatientAuthProvider } from '../context/PatientAuthContext';

export const metadata = {
  title: 'Online Prescription Platform',
  description: 'Online Prescription Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400&f[]=trench-slab@500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-canvas text-ink font-sans min-h-screen">
        <DoctorAuthProvider>
          <PatientAuthProvider>
            <div className="flex flex-col min-h-screen">
              {children}
            </div>
          </PatientAuthProvider>
        </DoctorAuthProvider>
      </body>
    </html>
  );
}
