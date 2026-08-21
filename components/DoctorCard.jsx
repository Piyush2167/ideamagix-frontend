"use client";
import { useRouter } from 'next/navigation';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function DoctorCard({ doctor }) {
  const router = useRouter();
  const imageUrl = doctor.profilePicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${doctor.profilePicture}` : null;

  return (
    <div className="group flex flex-col rounded-xl2 border border-line bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5">
      <div className="flex items-center gap-4">
        <Avatar src={imageUrl} name={doctor.name} size="lg" />
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-ink">{doctor.name}</h3>
          <p className="truncate text-sm text-clinic-600">{doctor.specialty}</p>
          <p className="mt-0.5 text-sm text-ink/45">{doctor.experience} years experience</p>
        </div>
      </div>

      <Button
        variant="secondary"
        onClick={() => router.push(`/patient/doctors/${doctor._id}/consult`)}
        className="mt-6 w-full justify-between"
      >
        Consult Doctor
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  );
}
