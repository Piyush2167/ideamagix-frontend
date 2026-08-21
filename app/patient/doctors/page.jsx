"use client";
import { useState, useEffect, useContext, useMemo } from 'react';
import api from '../../../api/axios';
import DoctorCard from '../../../components/DoctorCard';
import PatientTopbar from '../../../components/patient/PatientTopbar';
import { PatientAuthContext } from '../../../context/PatientAuthContext';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import Button from '../../../components/ui/Button';
import Container from '../../../components/ui/Container';
import { MagnifyingGlass, Stethoscope, ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function DoctorCardSkeleton() {
  return (
    <div className="rounded-xl2 border border-line bg-white p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3.5 w-1/3" />
        </div>
      </div>
      <Skeleton className="mt-6 h-10 w-full rounded-lg" />
    </div>
  );
}

export default function DoctorsList() {
  const { patient } = useContext(PatientAuthContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const fetchDoctors = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error('Failed to fetch doctors', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const specialties = useMemo(
    () => ['All', ...new Set(doctors.map((d) => d.specialty).filter(Boolean))],
    [doctors]
  );

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSpecialty = specialty === 'All' || d.specialty === specialty;
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
      return matchesSpecialty && matchesSearch;
    });
  }, [doctors, search, specialty]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <PatientTopbar search={search} onSearchChange={setSearch} />

      <Container as="main" className="flex-1 py-10">
        <div className="mb-8">
          <p className="text-sm text-ink/45">{greeting()}{patient?.name ? `, ${patient.name.split(' ')[0]}` : ''}</p>
          <h1 className="mt-1 font-trench text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight text-ink">Find the right doctor for your care</h1>
        </div>

        <div className="mb-6 sm:hidden">
          <div className="relative">
            <MagnifyingGlass size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors or specialties..."
              className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-clinic-500 focus:ring-2 focus:ring-clinic-500/15"
            />
          </div>
        </div>

        {specialties.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors
                  ${specialty === s ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink/60 hover:border-ink/30'}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => <DoctorCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            description="We couldn't load the list of doctors. Please try again."
            action={<Button variant="secondary" onClick={fetchDoctors}><ArrowClockwise size={16} />Try Again</Button>}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Stethoscope size={32} weight="light" />}
            title={doctors.length === 0 ? 'No doctors available yet' : 'No doctors match your search'}
            description={doctors.length === 0 ? 'Please check back later.' : 'Try a different name or specialty.'}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((doc) => <DoctorCard key={doc._id} doctor={doc} />)}
          </div>
        )}
      </Container>
    </div>
  );
}
