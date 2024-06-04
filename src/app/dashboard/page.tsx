import Container from '@/components/container';
import VenueManagerDashboard from './venue-manager_dashboard';

const VenueManagerPage = () => {
  return (
    <main className="pt-28 bg-slate-50">
      <Container>
        <VenueManagerDashboard />
      </Container>
    </main>
  );
};

export default VenueManagerPage;
