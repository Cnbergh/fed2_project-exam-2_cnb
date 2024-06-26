import Container from '@/components/container';
import VenueManagerDashboard from './venue-manager_dashboard';

const VenueManagerPage = () => {
  return (
    <div className="m-2">
    <main className="pt-16 bg-slate-50 rounded-3xl m-auto max-w-[1780px]">
      <Container>
        <VenueManagerDashboard />
      </Container>
    </main>
    </div>
  );
};

export default VenueManagerPage;
