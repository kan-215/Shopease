import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <h1>Product Details for ID: {id}</h1>
      <p>This page will show details about the selected product.</p>
    </Container>
  );
}
