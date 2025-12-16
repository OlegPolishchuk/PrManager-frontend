import { createFileRoute } from '@tanstack/react-router';

import { RegisterForm } from '@/app/components/auth/register-form.tsx';

export const Route = createFileRoute('/_auth/register/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
